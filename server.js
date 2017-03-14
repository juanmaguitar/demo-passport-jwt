const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')
const db = require('./db')

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/demo-passport-jwt'
const app = express()

db.open(DB_URI);

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.get('/', (req, res) => res.send(`Hello! The API is at http://localhost:${PORT}/api`) );
app.use('/api', routesAuth );
app.use('/private', routesPrivate );

// Start the server
app.listen(PORT, () => console.log(`Magic happens at http://localhost:${PORT}`) );
