const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("./asyncWrapper");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const verifyUser = asyncWrapper(async(req, res, next) => {
    const token = req.cookies["access-token"];
    if(!token){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "Access Denied No Token Found"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded.id
    next();
})

const isAdmin = asyncWrapper(async(req, res, next) => {
    /********************Projection requesting for only the field i want*****************************/
    const userRole = await User.findById(req.user, "role")
    /*console.log(userRole)*/
    if(!userRole){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User Does Not Exist"})
    }
    if(userRole.role != "admin"){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Access Denied Admins Only"})
    }
    //req.user.isAdmin = true;
    next();
})

module.exports = {verifyUser, isAdmin};