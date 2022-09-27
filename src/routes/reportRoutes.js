const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Report = mongoose.model('Report');

const router = express.Router();

router.use(requireAuth);

router.post('/reports', async (req, res) => {
    const { description, timestamp, phenomenonId, locationId } = req.body;

    if (!timestamp || !phenomenonId || !locationId) {
        return res.status(422).send({ error: 'You must provide a phenomenon or location'});
    }
    try {
        const report = new Report({ description, timestamp, phenomenonId, locationId, creatorId: req.user._id });
        await report.save();
        res.send(report);

    } catch (err) {
        res.status(422).send({ error: err.message });
    }

});

module.exports = router;