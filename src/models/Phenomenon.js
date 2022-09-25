const mongoose = require('mongoose');

// Phenomenon
const phenomenonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

mongoose.model('Phenomenon', phenomenonSchema);