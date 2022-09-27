const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

require('dotenv').config();
const secret_key = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401). send({ error: 'You must be logged in.'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, secret_key, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.'});
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        console.log(user);
        req.user = user;
        next();
    });

};
