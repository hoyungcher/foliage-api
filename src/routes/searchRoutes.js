const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Location = mongoose.model('Location');

const router = express.Router();

router.use(requireAuth);

router.get('/locationautocomplete', async (req, res) => {
    try {
        console.log(req.query.name);
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
                $limit: 5,
            },
        ]);
        if (results) 
            {return res.send(results);}
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

module.exports = router;