const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    description:
    {
        type: String, required: true
    },
    amount:
    {
        type: Number, required: true
    },
    category:
    {
        type: String, required: true
    },
    date:
    {
        type: Date, default: Date.now
    },
    type: {
        type: String, required: true,
        enum: ['income', 'expense'],
        required: true
    }
});
transactionSchema.virtual('transactionId').get(function () {
    return this._id;
});

transactionSchema.set('toJSON', { virtuals: true });
transactionSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Transaction', transactionSchema);
