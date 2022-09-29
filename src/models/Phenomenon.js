const mongoose = require('mongoose');

// Phenomenon
const phenomenonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category'
        type: String,
        enum: ['Birds', 'Blossoms', 'Marine Life', 'Leaves', 'Harvest']
    }
})

mongoose.model('Phenomenon', phenomenonSchema);