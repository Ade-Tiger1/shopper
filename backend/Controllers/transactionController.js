const Transaction = require("../Models/transactionModel")
const Order = require("../Models/orderModel");
const asyncWrapper = require("../Middlewares/asyncWrapper");
const { StatusCodes } = require('http-status-codes');
const { Created, ServerError, badRequest, Sucess, notFound, Conflict } = require('../Middlewares/returnRes');
const User = require('../Models/userModel');
const Auth = require('../Models/authModel');
const Cart = require("../Models/cartModel");

/************Initiate Payment Controller******************/

const initiatePayment = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    const { phone_number } = req.body;
    // console.log("=== PAYMENT INITIATION STARTED ===");
    // console.log("User ID:", userid);
    // console.log("Phone Number:", phone_number);

    const user = await User.findById(userid);
    if(!user){
        // console.log("❌ User not found");
        return notFound(res, "User does not exist")
    }
    // console.log("✓ User found:", user.name);

    const authEmail = await Auth.findOne({userid: userid})
    if(!authEmail){
        // console.log("❌ Auth email not found");
        return notFound(res, "User email not found")
    }
    // console.log("✓ Email found:", authEmail.email);

    // Get cart
    const cart = await Cart.findOne({ userid }).populate("items.product");
    if (!cart || cart.items.length === 0) return badRequest(res, "No items in cart");

    const orderItems = cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        priceAtPurchase: parseFloat(item.product.price)
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
    const shippingFee = parseFloat(req.body.shippingCost) || 9.99; // frontend passes 9.99 or 19.99
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + shippingFee + tax;

    // const order = await Order.findById(orderId);
    // if(!order){
    //     console.log("❌ Order not found");
    //     return notFound(res, "Order does not exist")
    // }
    // console.log("✓ Order found, Amount:", order.totalAmount);


    // if(order.userid.toString() !== userid){
    //     console.log("❌ User not authorized for this order");
    //     return badRequest(res, "You are not authorized to pay for this order")
    // }
    // if(order.paymentStatus === "paid"){
    //     console.log("❌ Order already paid");
    //     return Conflict(res, "This order has already been paid for")
    // }

    const transactionRef = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const paymentData = {
        tx_ref: transactionRef,
        amount: totalAmount,
        currency: "NGN",
        redirect_url: "http://localhost:5000/payment-callback",
        customer: {
            email: authEmail.email,
            phonenumber: phone_number,
            name: user.name
        },
        customizations: {
            title: "Shopper Payment",
            description: `Payment for cart items by ${user.name}`,
            logo: "https://your-logo-url.com/logo.png"
        }
    };

    // console.log("📤 Sending to Flutterwave:", JSON.stringify(paymentData, null, 2));

    try{
        const response = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        // console.log("📥 Flutterwave Response:", data);

        if (!data.data || !data.data.link) {
            return ServerError(res, "Failed to get payment link from Flutterwave");
        }

        const link = data.data.link;

        const newTransaction = await Transaction.create({
            userId: userid,
            tx_ref: transactionRef,
            amount: totalAmount,
            currency: "NGN",
            email: authEmail.email,
            phone_number,
            payment_link: data.data.link,
            deliveryAddress: req.body.deliveryAddress,
            status: "pending",
            cartItems: orderItems, // save cart items for later order creation
            shippingFee,
            tax
        });

        return res.status(200).json({
            status: "success",
            paymentLink: link,
            transaction: newTransaction,
        });

    } catch (err) {
        // console.error("❌ PAYMENT ERROR:", err);
        return ServerError(res, "Payment initialization failed");
    }

})


/************Payment Verify Callback Handler******************/
const paymentCallback = asyncWrapper(async(req, res, next) => {
    const { status, transaction_id, tx_ref } = req.query;

     // ❌ Handle user cancelling or failed payment (before verification)
    if (status && status !== "successful") {
        return res.redirect(`https://shopper-tpid.onrender.com/payment-failed?reason=${status}`);
    }

    if(!transaction_id || !tx_ref){
        return badRequest(res, "Invalid payment callback parameters")
    }


    // 🔥 Verify payment using FETCH instead of Flutterwave SDK
    const verifyRes = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const verifyData = await verifyRes.json();

    // If verification failed
    if (verifyData.status !== "success") {
        return badRequest(res, "Payment verification failed");
    }

    // Look up the transaction in DB
    const transaction = await Transaction.findOne({ tx_ref });
    // if (!transaction) {
    //     return notFound(res, "Transaction not found");
    // }
    if (!transaction) {
        return res.redirect(`https://shopper-tpid.onrender.com/payment-failed?reason=transaction_not_found`);
    }

    // If already paid → redirect immediately
    if (transaction.status === "paid") {
        return res.redirect(`https://shopper-tpid.onrender.com/payment-success?tx_ref=${tx_ref}`);
    }

    // Update transaction
    transaction.status = "paid";
    transaction.payment_response = verifyData.data;
    await transaction.save();

    // ✅ Create order now
    const newOrder = await Order.create({
        userid: transaction.userId,
        items: transaction.cartItems,
        totalAmount: transaction.amount,
        deliveryAddress: transaction.deliveryAddress,
        paymentStatus: "paid",
        orderStatus: "processing"
    });

    //Link transaction to order
    transaction.orderId = newOrder._id;
    await transaction.save();


    // ✅ Clear cart
    await Cart.findOneAndDelete({ userid: transaction.userId });

    return res.redirect(`https://shopper-tpid.onrender.com/payment-success?tx_ref=${tx_ref}`);
})

const getUserTransactions = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    const transactions = await Transaction.find({ userId: userid }).populate("orderId", "status paymentStatus totalAmount items").sort({ createdAt: -1 });
    return Sucess(res, "User transactions fetched successfully", { count: transactions.length, transactions })
})

const getAllTransactions = asyncWrapper(async(req, res, next) => {
    const transactions = await Transaction.find().populate("orderId", "status paymentStatus totalAmount items").sort({ createdAt: -1 });
    return Sucess(res, "All transactions fetched successfully", { count: transactions.length, transactions })
});


module.exports = {
    initiatePayment, 
    paymentCallback, 
    getUserTransactions,
    getAllTransactions
};