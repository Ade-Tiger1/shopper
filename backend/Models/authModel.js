const mongoose = require("mongoose");
const User = require("./userModel")

const authSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    email: {type: String, required: [true, "Please provide email"], unique: [true, 'Email already exist'], trim: true},
    password: {type: String, required: [true, 'Please provide password'], trim: true}
}, {timestamps: true});

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;