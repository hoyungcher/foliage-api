require('./src/models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');

require('dotenv').config();
const uri = process.env.ATLAS_URI
mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', err => {
    console.log('Error connecting to mongo', err);
});


// Users
const users = [
    { "email": "user1@foliage.com", "password": "foliage"},
    { "email": "user2@foliage.com", "password": "foliage"},
    { "email": "user3@foliage.com", "password": "foliage"},
    { "email": "user4@foliage.com", "password": "foliage"}
];
const createUser = async (user) => {
    try {
        const { email, password } = user;
        const newUser = new User({ email, password})
        await newUser.save();
        console.log(`User with email ${user.email} saved!`)
    } catch (err) {
        console.log(err)
    }
}


createUser(users[0]);

mongoose.connection.close();