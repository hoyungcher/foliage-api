const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Phenomenon = mongoose.model('Phenomenon');

const router = express.Router();

router.use(requireAuth);

router.get('/phenomena', async (req, res) => {
        const phenomena = await Phenomenon
            .find({})
        res.send(phenomena)

});

module.exports = router;
