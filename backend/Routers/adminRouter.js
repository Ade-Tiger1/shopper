const express = require("express")
const router = express.Router()
const {verifyUser, isAdmin} = require("../Middlewares/verifyUser")
const {register, makeAdmin }= require("../Controllers/authController")
const { deleteUser, updateUser, getAllUsers } = require("../Controllers/userController")


/*******************Admin User CRUD Route***************************/
router.post("/create-user", register)
router.delete("/delete-user/:id", deleteUser)
router.put("/edit-user/:id", updateUser)
router.get("/get-users", getAllUsers)

router.put("/make-admin/:id", makeAdmin)


module.exports = router