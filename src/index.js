// require only once
require('./models/User');
require('./models/City');
require('./models/Location');
require('./models/Phenomenon');
require('./models/Report');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const locationRoutes = require('./routes/locationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const phenomenonRoutes = require('./routes/phenomenonRoutes');
const requireAuth = require('./middleware/requireAuth');

// Models
const City = mongoose.model('City');
const Location = mongoose.model('Location');
const Phenomenon = mongoose.model('Phenomenon');
const Report = mongoose.model('Report');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(adminRoutes);
app.use(locationRoutes);
app.use(reportRoutes);
app.use(phenomenonRoutes);
// app.use(searchRoutes);

// environment variables
require('dotenv').config();
const uri = process.env.ATLAS_URI

mongoose.connect(uri); 

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', err => {
    console.log('Error connecting to mongo', err);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});