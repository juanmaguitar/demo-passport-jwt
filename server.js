const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.Promise = global.Promise

const routesAuth = require('./routes/auth')

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/demo-passport-jwt'
const app = express()

mongoose.connect(DB_URI);

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.get('/', (req, res) => res.send(`Hello! The API is at http://localhost:${PORT}/api`) );
app.use('/api', routesAuth );

// Start the server
app.listen(PORT);
console.log(`There will be dragons: http://localhost:${PORT}`);