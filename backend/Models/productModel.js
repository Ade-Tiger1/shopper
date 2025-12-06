const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Provide Product Title"], trim: true},
    description: {type: String, required: [true, "Provide Product Description"], trim: true},
    category: {type: String, enum: {values: ["men", "women", "kids"], message: "{VALUE} Is Not Supported"}, required: [true, "Select Category"], default: "men"},
    subCategory: {type: String, enum: {values:["trousers", "shirts", "caps", "shoes", "gown", "shorts"], message: "{VALUE} Is Not Supported"}, required: [true, "Select Sub Category"], default: "shirts"},
    sizes: [{type: String, enum: {values: ["S", "M", "L", "XL", "XXL"], message: "{VALUE} Is Not Supported"}, default: "M"}],
    price: {type: Number, min: 0, rquired: [true, "Provide Product Price"], trim: true},
    discountPrice: {type: Number, min: 0, default: 0},
    inStock: {type: Number, min: 0, default: 1},
    image: [{type: String, required: [true, "Provide Product Image"]}],
    isPromo: {type: String, default: false}
}, {timestamps: true})

module.exports.Product = mongoose.model("Product", productSchema);