// require only once
require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})