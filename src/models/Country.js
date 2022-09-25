const mongoose = require('mongoose');

// Country
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

mongoose.model('Country', countrySchema);