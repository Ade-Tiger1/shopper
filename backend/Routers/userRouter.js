const express = require("express")
const { getAllUsers, deleteUser, updateUser, getUserById } = require("../Controllers/userController")
const router = express.Router()


router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.delete("/delete/:id", deleteUser)
router.put("/edit/:id", updateUser)

module.exports = router