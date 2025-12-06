const Order = require("../Models/orderModel")
const Cart = require("../Models/cartModel")
const asyncWrapper = require("../Middlewares/asyncWrapper");
const { notFound, Sucess, Conflict, Created, ServerError, badRequest } = require("../Middlewares/returnRes");
const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/productModel");
const Auth = require("../Models/authModel")
const {Country, City, State} = require("country-state-city")

// const CreateOrder = asyncWrapper(async(req, res, next) => {
//     const userid = req.user
//     const { deliveryAddress } = req.body;

//     if(!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.country || !deliveryAddress.zip){
//         return badRequest(res, "Provide Complete Delivery Address")
//     }
//     const country = Country.getCountryByCode(deliveryAddress.country);
//     if(!country){
//         return badRequest(res, "Invalid Country Code")
//     }
//     const state = State.getStatesOfCountry(deliveryAddress.country);
//     if(!state){
//         return badRequest(res, "Invalid State Code for the Given Country")
//     }
//     const validState = state.find(st => st.isoCode === deliveryAddress.state);
//     if(!validState){
//         return badRequest(res, "Invalid State for the Given Country")
//     }
//     // const cities = City.getCitiesOfState(deliveryAddress.country, validState.isoCode);
//     // const validCity = cities.find(ct => ct.name === deliveryAddress.city);
//     // if(!validCity){
//     //     return badRequest(res, "Invalid City for the Given State and Country")
//     // }

//     if(!deliveryAddress.city || deliveryAddress.city.trim() === ""){
//         return badRequest(res, "City is required")
//     }

//     /**********Get User Cart******************/
//     const cart = await Cart.findOne({userid}).populate("items.product");
//     if(!cart || cart.items.length === 0){
//         return notFound(res, "No Item In Cart")
//     }
//     const orderItems = cart.items.map(item => ({
//         product: item.product._id,
//         quantity: item.quantity,
//         size: item.size,
//         priceAtPurchase: parseInt(item.product.price)
//     }))

//     const totalAmount = orderItems.reduce((total, item) => total + parseInt(item.priceAtPurchase * item.quantity), 0);
//     const newOrder = new Order({
//         userid,
//         items: orderItems,
//         totalAmount,
//         deliveryAddress,
//         paymentStatus: "pending",
//         orderStatus: "processing"
//     })
//     try{
//         await newOrder.save();
//         await Cart.findOneAndDelete({userid});
//         return Created(res, "Order Placed Sucessfully", newOrder)
//     }catch(err){
//         return ServerError(res, err)
//     }
// })

/********************Get User Orders***************/
const getUserOrders = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    const orders = await Order.find({userid}).populate("items.product").sort({createdAt: -1});
    //console.log(orders)
    if(!orders || orders.length === 0){
        return notFound(res, "No Order Found")
    }
    return Sucess(res, "User Orders Fetched Sucessfully", {count: orders.length, orders})
})

/****************Get Order By ID********************/
const getOrderById = asyncWrapper(async(req, res, next) => {
    const userid = req.user;
    const { id } = req.params;
    if(!id || id.length !== 24){
        return badRequest(res, "Invalid Order ID")
    }
    /*********.populate() brings everything from the product table and pass it here******************/
    const order = await Order.findOne({_id: id, userid}).populate("items.product");
    if(!order){
        return notFound(res, "Order Not Found")
    }
    if(order.userid.toString() !== userid && !req.user.isAdmin){
        return badRequest(res, "You are not authorized to view this order")
    }
    return Sucess(res, "Order Fetched Sucessfully", order)
})

/****************Get All Orders - Admin Only********************/
const getAllOrders = asyncWrapper(async(req, res, next) => {
    let orders = await Order.find({}).populate("items.product").populate("userid", "name").sort({createdAt: -1});
    //console.log("this is order", orders)
    if(!orders || orders.length === 0){
        return notFound(res, "No Order Found")
    }
    const authEmail = await Auth.findOne({userid: orders[0].userid._id})
    if(!authEmail){
        notFound(res, "No User Found")
    }
    //console.log("This is email", authEmail.email)
    //orders[0].userid.email = authEmail.email
    //orders = {...orders, : authEmail.email}
    //console.log("This is order after email", orders)
    return Sucess(res, "All Orders Fetched Sucessfully", {count: orders.length, orders, userEmail: authEmail.email})
})

/****************Update Order Status - Admin Only********************/
const updateOrderStatus = asyncWrapper(async(req, res, next) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const validStatus = ["processing", "shipped", "delivered", "cancelled"];
    if(!id || id.length !== 24){
        return badRequest(res, "Invalid Order ID")
    }
    if(!orderStatus || !validStatus.includes(orderStatus)){
        return badRequest(res, "Invalid Order Status")
    }

    const order = await Order.findByIdAndUpdate(id, {orderStatus}, {new: true, runValidators: true});
    if(!order){
        return notFound(res, "Order Not Found")
    }
    return Sucess(res, "Order Status Updated Sucessfully", order)
})

/****************Delete Order - Admin Only********************/
const deleteOrder = asyncWrapper(async(req, res, next) => {
    const { id } = req.params;
    if(!id || id.length !== 24){
        return badRequest(res, "Invalid Order ID")
    }
    const order = await Order.findByIdAndDelete(id);
    if(!order){
        return notFound(res, "Order Not Found")
    }
    return Sucess(res, "Order Deleted Sucessfully")
})

module.exports = {
    // CreateOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
}