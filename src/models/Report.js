const mongoose = require('mongoose');

// Report
const reportSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    phenomenaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phenomena'
    }
})

mongoose.model('Report', reportSchema);