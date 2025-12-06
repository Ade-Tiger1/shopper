const express = require("express")
const { verifyUser } = require("../Middlewares/verifyUser")
const { initiatePayment, paymentCallback, getUserTransactions, getAllTransactions } = require("../Controllers/transactionController")
const router = express.Router()


router.post("/pay", verifyUser, initiatePayment)
router.get("/payment-callback", paymentCallback)
router.get("/payments", verifyUser, getUserTransactions)
router.get("/transactions", verifyUser, getAllTransactions)

module.exports = router