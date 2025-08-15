// routes/auth.js
const express = require('express');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jsonwebtoken = eventNames.JWT_SECRET || "secretkey";
const router = express.Router();
const rateLimit=require('express-rate-limit')

const limiter=rateLimit({
    max:4,
    windowMs:1000*60*15,
    handler:(req,res)=>{
        console.log(req.rateLimit);
        res.status(429).json({success:false,error:"Multiple attempts failed. Try again after 15 minutes"});
    }
})

// User Registration
router.post('/register',[
    body('username').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5})

], async (req, res) => {
    try {
        const errors=validationResult(req);
        console.log("Signup request arrived");
        if(!errors.isEmpty())
            return res.status(400).json({error: "Insufficient data provided"});
        const { username, email, password } = req.body;
        const user=User.findOne({email});
        if(user!=null)
                return res.status(400).json({error:"Email already exists"});
        const salt = await bcrypt.genSalt(10);
        const new_pass = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: new_pass });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// User Login
router.post('/login',limiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success:false, error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success:false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, jsonwebtoken);
        res.json({ success:true ,token });
    } catch (error) {
        res.status(500).json({ success:false, error: 'Failed to log in' });
    }
});

module.exports = router;
