const mongoose = require("mongoose");
const User = require("./userModel")
const Product = require("./productModel")

const cartSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [
        {
           product:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
           quantity: {type: Number, required: true, min: 1, defailt: 1},
           size: {type: String, enum: {values: ["S", "M", "L", "XL", "XXL"], message: "{VALUE} Is Not Supported"}, default: "M"}
        }
    ]
}, {timestamps: true})


const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart;