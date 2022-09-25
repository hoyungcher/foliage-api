const mongoose = require('mongoose');

// City
const citySchema = new mongoose.Schema({
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    name: {
        type: String,
        required: true
    }
})

mongoose.model('City', citySchema)