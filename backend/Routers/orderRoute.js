const express = require("express");
const { CreateOrder, getOrderById, getUserOrders, getAllOrders,updateOrderStatus, deleteOrder } = require("../Controllers/orderController");
const { verifyUser, isAdmin } = require("../Middlewares/verifyUser");
const router = express.Router();

/***************Create Order User**************************/
// router.post("/", verifyUser, CreateOrder)
router.get("/", verifyUser, getUserOrders)
router.get("/:id", verifyUser,  getOrderById)

/***************Admin Routes - Get All Orders, Update Order Status, Delete Order*********************/
router.get("/admin/all-orders", verifyUser, isAdmin, getAllOrders)
router.patch("/admin/update-order/:id", verifyUser, isAdmin, updateOrderStatus)
router.delete("/admin/delete-order/:id", verifyUser, isAdmin, deleteOrder)

module.exports = router;
