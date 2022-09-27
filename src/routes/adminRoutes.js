const express = require('express');
const mongoose = require('mongoose');

// const Country = mongoose.model('Country');
const City = mongoose.model('City');
const Location = mongoose.model('Location');
const Category = mongoose.model('Category');
const Phenomenon = mongoose.model('Phenomenon');
const Report = mongoose.model('Report');

const router = express.Router();

// sample routes for setting up database

// Categories
router.post('/categories', async (req, res) => {
    const { name } = req.body
    try {
        const category = new Category({ name });
        await category.save();
        res.send({ category });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

// Phenomena
router.post('/phenomena', async (req, res) => {
    const { name, categoryName } = req.body
    try {
        const category = await Category.findOne({name: categoryName});
        const phenomenon = new Phenomenon({ name, categoryId: category._id });
        await phenomenon.save();
        res.send({ phenomenon });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

// Locations
router.post('/locations', async (req, res) => {
    const { name, coordinates, cityName } = req.body
    try {
        const city = await City.findOne({name: cityName});
        const location = new Location({ 
            name, 
            cityId: city._id,
            coordinates});
        await location.save();
        res.send({ location });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

// Cities
router.post('/cities', async (req, res) => {
    const { name, countryName } = req.body
    try {
        const country = await Country.findOne({name: countryName});
        const city = new City({ name, countryId: country._id });
        await city.save();
        res.send({ city });
    } catch (err) {
        res.status(422).send(err.message);
    }
})

module.exports = router;