const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/fin_tracker";

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
