const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../Middlewares/asyncWrapper")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Auth = require("../Models/authModel")
const User = require("../Models/userModel")

const register = asyncWrapper(async(req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Fill in complete details"})
    }
    const verifyEmail = await Auth.findOne({email})
    if(verifyEmail){
        return res.status(StatusCodes.CONFLICT).json({msg: "User Already Exist"})
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const users = new User({
        name,
    })
    const savedUser = await users.save();
    const auth = new Auth({
        userid: savedUser._id,
        email,
        password: hashedPassword
    })
    const savedAuth = await auth.save();
    return res.status(StatusCodes.CREATED).json({msg: "Signup Sucessful"})
});

const login = asyncWrapper(async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Fill in complete details"});
    }
    const verifyEmail = await Auth.findOne({email})
    
    if(!verifyEmail){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User does not exist"})
    }
    const verifyPassword = await bcrypt.compare(password, verifyEmail.password)
    
    if(!verifyPassword){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "Incorrect username or password"})
    }
    const token = jwt.sign({id: verifyEmail.userid}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)// 7days
    })
    return res.status(StatusCodes.OK).json({msg: "Signin Sucessfully"});
})

const logout = asyncWrapper(async(req, res) => {
    res.clearCookie("access-token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    res.status(200).json({ message: "Logout successful" });
});

const getAllAuth = asyncWrapper(async(req, res, next) => {
    const authUsers = await Auth.find({});
    return res.status(StatusCodes.OK).json({count: authUsers.length, authUsers})
})

const makeAdmin = asyncWrapper(async(req, res, next) => {
    const {id} = req.params;
    //const users = User.find({})
    const upgradeToAdmin = await User.findByIdAndUpdate(id, { role: "admin"}, {new: true})
    if(!upgradeToAdmin){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User Not Found"})
    }
    return res.status(StatusCodes.OK).json({msg: "User Upgraded Sucessfully"});
})
module.exports= {
    register,
    getAllAuth,
    login,
    logout,
    makeAdmin,
}
