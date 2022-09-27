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
    phenomenonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phenomena'
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

mongoose.model('Report', reportSchema);