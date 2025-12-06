const express = require("express")
const router = express.Router()
const {register, login, getAllAuth, logout }= require("../Controllers/authController")


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

router.get("/", getAllAuth)
module.exports = router