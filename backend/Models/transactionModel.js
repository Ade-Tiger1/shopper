const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // orderId is optional because transaction is created before order
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

  tx_ref: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "NGN" },

  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  payment_link: { type: String },

  // Save deliveryAddress as object
  deliveryAddress: {
    fullName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  // Save cart items for later order creation
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      priceAtPurchase: { type: Number, required: true },
    }
  ],

  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },

  status: { type: String, enum: ["paid", "pending"], default: "pending" },
  payment_response: { type: Object },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
