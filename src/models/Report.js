const mongoose = require('mongoose');

// Report
const reportSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    phenomenon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phenomenon'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

mongoose.model('Report', reportSchema);