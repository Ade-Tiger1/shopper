const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Please Provide Name"], trim: true, maxlength: [200, "Not more than 200 characters"]},
    //phone: {type: String, trim: true, unique: true},
    address: {type: String, trim: true, default: null},
    role: {type: String, enum: ["admin", "user"], default: "user"}
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;