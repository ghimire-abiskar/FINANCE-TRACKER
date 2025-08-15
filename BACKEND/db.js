const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI || "mongodb://127.0.0.1:27017/expense_tracker";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected successfully");
    }
    catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
}

module.exports = connectToMongo;
