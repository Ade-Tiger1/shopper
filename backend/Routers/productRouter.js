const express = require("express")
const router = express.Router()
const upload = require("../Middlewares/Multer/multerImage")
const {createProduct, getAllProduct, deleteProduct, updateProduct} = require("../Controllers/productController")
const { verifyUser, isAdmin } = require("../Middlewares/verifyUser")


/*********************Product By Admin**************************/
router.post("/create-product", upload.array("image", 5), verifyUser, isAdmin, createProduct)
router.get("/", getAllProduct)//verifyUsers middleware
router.delete("/delete-product/:id", verifyUser, isAdmin, deleteProduct)
router.put("/edit/:id", upload.array("image", 5), verifyUser, isAdmin, updateProduct)

module.exports = router;