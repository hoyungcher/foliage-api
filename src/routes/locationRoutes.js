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

router.get('/locationautocomplete', async (req, res) => {
    try {
        let results;
        results = await Location.aggregate([
            {
                $search: {
                    index: "location-autocomplete",
                    autocomplete: {
                        query: req.query.name,
                        path: "name",
                        fuzzy: {
                            maxEdits: 1,
                        },
                        tokenOrder: "sequential",
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    city: 1,
                    name: 1,
                }
            },
            {
                $limit: 10,
            },
        ]);
        if (results) {
            results = await Location.populate(results, {path: "city"}); 
            return res.send(results);
        }
    } catch (err) {
        res.send(err.message);
    }

});

module.exports = router;