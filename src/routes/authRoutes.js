require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

// Sign up route
router.post('/createaccount', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const secret_key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id}, secret_key);
        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message);
    }
});

// Sign in route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email and password." })
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(422).send({ error: "Invalid password or email."});
    }
    try {
        await user.comparePassword(password);
        const secret_key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id}, secret_key)
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email.'});
    }
});

router.get('/test', (req, res) => {
    res.status(200).send("Success");
});
module.exports = router;