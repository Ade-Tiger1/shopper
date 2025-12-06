const mongoose = require("mongoose")
require("dotenv").config()

const connectDatabase = () => {
    return mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connected to Database"))
}

module.exports = connectDatabase;