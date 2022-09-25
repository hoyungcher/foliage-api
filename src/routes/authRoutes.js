require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const secret_key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id}, secret_key);
        res.send({token});
    } catch (err) {
        res.status(422).send(err.message);
    }
});

module.exports = router;