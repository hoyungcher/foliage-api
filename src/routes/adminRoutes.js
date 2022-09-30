const express = require('express');
const mongoose = require('mongoose');

// const Country = mongoose.model('Country');
const City = mongoose.model('City');
const Location = mongoose.model('Location');
const Category = mongoose.model('Category');
const Phenomenon = mongoose.model('Phenomenon');
const Report = mongoose.model('Report');

const router = express.Router();

// sample routes for adding new fields to database

// Phenomena
// const samplePhenomenon = {
//     "name": "Cherry Blossoms",
//     "category": "Blossoms"
// }

router.post('/phenomena', async (req, res) => {
    const { name, category } = req.body
    try {
        const phenomenon = new Phenomenon({ name, category });
        await phenomenon.save();
        res.send({ phenomenon });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

// Locations
// const sampleLocation = {
//     "name": "Victoria Park",
//     "coordinates": {
//         "latitude": 51.102,
//         "longitude": 0.001
//     },
//     "city": "London"
// }

router.post('/locations', async (req, res) => {
    const { name, coordinates, city } = req.body
    try {
        const city = await City.findOne({name: city});
        const location = new Location({ 
            name, 
            city: city._id,
            coordinates});
        await location.save();
        res.send({ location });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

// Cities
// const sampleCity = {
//     "name": "London",
//     "country": "United Kingdom of Great Britain and Northern Ireland"
// }

router.post('/cities', async (req, res) => {
    const { name, country } = req.body
    try {
        const city = new City({ name, country });
        await city.save();
        res.send({ city });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

module.exports = router;