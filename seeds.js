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
    { "email": "user4@foliage.com", "password": "foliage"},
    { "email": "user5@foliage.com", "password": "foliage"}
];
const createUser = async (user) => {
    try {
        const { email, password } = user;
        const newUser = new User({ email, password})
        await newUser.save();
        console.log(`User with email ${user.email} saved!`);
    } catch (err) {
        console.log(err)
    }
}


// Phenomena
const phenomena = [
    {
        "name": "Cherry Blossoms",
        "category": "Blossoms"
    },
    {
        "name": "Heather",
        "category": "Blossoms"
    },
    {
        "name": "Lavender",
        "category": "Blossoms"
    },
    {
        "name": "Sunflower",
        "category": "Blossoms"
    },
    {
        "name": "Tulip",
        "category": "Blossoms"
    },
    {
        "name": "Wisteria",
        "category": "Blossoms"
    },
    {
        "name": "Autumn Foliage",
        "category": "Leaves"
    },
    {
        "name": "Arctic Tern",
        "category": "Birds"
    },
    {
        "name": "Osprey",
        "category": "Birds"
    },
    {
        "name": "Starling",
        "category": "Birds"
    },
    {
        "name": "Parakeet",
        "category": "Birds"
    },
    {
        "name": "Swallow",
        "category": "Birds"
    },
    {
        "name": "Swift",
        "category": "Birds"
    },
    {
        "name": "Bioluminescence",
        "category": "Marine Life"
    },
    {
        "name": "Apple",
        "category": "Harvest"
    },
    {
        "name": "Strawberry",
        "category": "Harvest"
    },
    {
        "name": "Pumpkin",
        "category": "Harvest"
    },
    
]

const createPhenomenon = async (phenomenon) => {
    try {
        const { name, category } = phenomenon;
        const newPhenomenon = new phenomenon({ name, category });
        await newPhenomenon.save();
        console.log(`Phenomenon ${phenomenon.name} saved!`);
    } catch (err) {
        console.log(err);
    }
}


// Cities
const cities = [
    {
        "name": "London",
        "country": "United Kingdom of Great Britain and Northern Ireland"
    },
]

// Locations
const locations = [
]


for (const user of users) {
    createUser(user);
}

for (const phenomenon of phenomena) {
    createPhenomenon(phenomenon);
}



mongoose.connection.close();