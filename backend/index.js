const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDatabase = require("./DbConnect/dbConnect")
const port = process.env.PORT || 5000;
require("dotenv").config()
const {verifyUser, isAdmin} = require("./Middlewares/verifyUser")
const authRouter = require("./Routers/authRouter")
const userRouter = require("./Routers/userRouter")
const adminRouter = require("./Routers/adminRouter")
const productRouter = require("./Routers/productRouter")
const cartRouter = require("./Routers/cartRouter")
const orderRouter = require("./Routers/orderRoute")
const paymentRouter = require("./Routers/paymentRouter")

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json());

app.use(cookieParser())
app.use("/uploads", express.static("uploads"))



/******************Routes******************/
app.use("/auth", authRouter);
app.use("/user", verifyUser, isAdmin, userRouter);
app.use("/admin", verifyUser, isAdmin, adminRouter);
app.use("/products", productRouter);
app.use("/cart", verifyUser, cartRouter)
app.use("/orders", orderRouter);
app.use(paymentRouter);



// --------------- Serve React Frontend ---------------
const frontendPath = path.join(__dirname, "../frontend/shopper/dist");
app.use(express.static(frontendPath));
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


/******************Starting the server and connecting to database******************/
const startServer = async() => {
    try{
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Listening to port ${port}`)
        })
    }catch(err){
        console.log(err)
    }
};

startServer();
