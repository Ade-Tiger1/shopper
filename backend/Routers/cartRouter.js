const express = require("express")
const { addToCart, getCarts, updateCart, removeFromCart, clearCart } = require("../Controllers/cartController")
const router = express.Router()


router.post("/add", addToCart)
router.get("/", getCarts)
router.put("/edit/:id", updateCart)
router.delete("/delete/:id", removeFromCart)
router.delete("/clear", clearCart)

module.exports = router;