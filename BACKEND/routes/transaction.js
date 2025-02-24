const express = require('express');
const Transaction = require('../models/Transaction');
const verify = require('../middleware/verify')
const router = express.Router();


router.post('/add', verify, async (req, res) => {
    try {
        const { type, amount, category, description } = req.body;
        const newtransaction = new Transaction({
            userId: req.user.id,
            type,
            amount,
            category,
            description
        });
        await newtransaction.save();
        console.log(newtransaction  );
        res.status(201).json({ newtransaction });
    }
    catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/all', verify, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }).skip(skip).limit(limit);
        const total = Transaction.countDocuments({ userId: req.user.id });
        res.json(transactions);
    }
    catch {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/delete/:id', verify, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found!!!" })
        }
        if (!transaction.userId.toString() == req.user) {
            return res.status(401).json({ error: "Unauthorized access to delete the transaction\n" });
        }
        await transaction.deleteOne();
        res.json({ message: "Transaction deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
})

router.put('/update/:id', verify, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id); 
        const { type, amount, category, description } = req.body;
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found!!!" })
        }
        console.log(req.user);
        if (transaction.userId.toString() != req.user.id) {
            return res.status(401).json({ error: "Unauthorized access to update the transaction\n" });
        }
        console.log("hey");
        transaction.type = type || transaction.type;
        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;

        await transaction.save();
        res.json({ message: "Transaction updated successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;