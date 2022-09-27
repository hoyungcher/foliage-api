const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Report = mongoose.model('Report');
const Location = mongoose.model('Location');
const Phenomenon = mongoose.model('Phenomenon');

const router = express.Router();

router.use(requireAuth);

router.get('/reports', async(req, res) => {
    const reports = await Report
        .find({ creatorId: req.user._id })
        .populate("location")
        .populate("phenomenon");
    
    res.send(reports);
})


router.post('/reports', async (req, res) => {
    const { description, timestamp, phenomenon, location } = req.body;

    if (!timestamp || !phenomenon || !location) {
        return res.status(422).send({ error: 'You must provide a phenomenon or location'});
    }
    try {
        const report = new Report({ description, timestamp, phenomenon, location, creator: req.user._id });
        await report.save();
        res.send(report);

    } catch (err) {
        res.status(422).send({ error: err.message });
    }

});

module.exports = router;