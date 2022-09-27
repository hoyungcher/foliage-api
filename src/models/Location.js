const mongoose = require('mongoose');

// Location
const locationSchema = new mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    name: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    }
})

mongoose.model('Location', locationSchema);