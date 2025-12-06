const mongoose = require("mongoose")
const Product = require("../Models/productModel")
const User = require("../Models/userModel")

const orderSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            quantity: {type: Number, required: true, min: 1},
            size: {type: String, required: true},
            priceAtPurchase: {type: Number, required: true}
        }
    ],
    totalAmount: {type: Number, required: true},
    deliveryAddress: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        zip: {type: String, required: true}
    },
    paymentStatus: {type: String, enum: {values: ["pending", "paid", "failed"], message: "{VALUE} Is Not Supported"}, default: "pending"},
    orderStatus: {type: String, enum: {values: ["processing", "shipped", "delivered", "cancelled"], message: "{VALUE} Is Not Supported"}, lowercase: true, default: "processing"}
}, {timestamps: true})


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;