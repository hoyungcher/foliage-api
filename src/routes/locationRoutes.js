const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Report = mongoose.model('Report');
const Location = mongoose.model('Location');
const Phenomenon = mongoose.model('Phenomenon');

const router = express.Router();

router.use(requireAuth);

router.get('/locations/:locationId', async(req, res) => {
    const location = await Location
        .findOne({ _id: req.params.locationId })
    const reports = await Report
        .find({ location: req.params.locationId })
        .sort({timestamp: -1})
        .limit(20)
        .populate("phenomenon");
    
    
    res.send({ location, reports });
})

module.exports = router;