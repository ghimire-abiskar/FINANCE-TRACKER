// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    username:
    {
        type: String, required: true, unique: true
    },
    email:
    {
        type: String, required: true, unique: true
    },
    password:
    {
        type: String, required: true
    },
});


module.exports = mongoose.model('User', userSchema);
