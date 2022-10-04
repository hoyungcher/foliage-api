const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Report = mongoose.model('Report');
const Location = mongoose.model('Location');
const Phenomenon = mongoose.model('Phenomenon');

const router = express.Router();

router.use(requireAuth);

// Explore page endpoint
router.get('/reports/explore', async(req, res) => {
    const reports = await Report
        .find({})
        .sort({timestamp: -1})
        .limit(20)
        .populate("location")
        .populate("phenomenon");
    
    res.send(reports);
})

// Report page endpoint
router.get('/reports/:reportId', async(req, res) => {
    const report = await Report
        .findOne({ _id: req.params.reportId })
        .populate("location")
        .populate("phenomenon");
    
        res.send(report);
})

// User reports page endpoint
router.get('/reports', async(req, res) => {
    try {
        const reports = await Report
            .find({ creator: req.user._id })
            .populate("location")
            .populate("phenomenon");
    
        res.send(reports);

    } catch (err) {
        res.status(422).send({ error: err.message });
    }
})

// Create report page endpoint
router.post('/reports', async (req, res) => {
    // location and phenomenon are ObjectIds
    const { description, timestamp, phenomenon, location, title } = req.body;

    if (!timestamp || !phenomenon || !location || !title) {
        return res.status(422).send({ error: 'You must provide a phenomenon or location'});
    }
    try {
        const report = new Report({ description, timestamp, phenomenon, location, title, creator: req.user._id });
        await report.save();
        res.send(report);

    } catch (err) {
        res.status(422).send({ error: err.message });
    }

});

module.exports = router;