const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')

const app = express()

app.use( express.static( path.join(__dirname, '../client') ) )

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.get('/', (req, res) => res.send(`Hello! The API is at http://localhost:${PORT}/api`) )
app.use('/api', routesAuth )
app.use('/private', routesPrivate )

module.exports = app