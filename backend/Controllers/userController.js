const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../Middlewares/asyncWrapper");
const User = require("../Models/userModel");
const Auth = require("../Models/authModel")

/************************Get all users*******************************/
const getAllUsers = asyncWrapper(async(req, res, next) => {
    const users = await User.find({})
    return res.status(StatusCodes.OK).json({count: users.length, users})
})

/************************Get single users by id**********************/
const getUserById = asyncWrapper(async(req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User does not exist"});
    }
    return res.status(StatusCodes.OK).json(user)
})

/************************Update user by id*****************************/
const updateUser = asyncWrapper(async(req, res, next) => {
    const {id} = req.params;
    const {name, address} = req.body
    const updated = await User.findByIdAndUpdate(id, {name, address}, {new: true, runValidators: true})
    if(!updated){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User does not exist"})
    }
    return res.status(StatusCodes.OK).json(updated)
})

/*************************Delete users*******************************/
const deleteUser = asyncWrapper(async(req, res, next) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id)
    if(!deleteUser){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "No User Found"})
    }
    const deleteFromAuth = await Auth.findOneAndDelete({userid: id})
    return res.status(StatusCodes.OK).json({msg: "Deleted Sucessfully"})
})

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById
}