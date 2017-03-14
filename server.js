const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jwt-simple');

mongoose.Promise = global.Promise

const config = require('./config')
const apiRoutes = require('./routes')

const PORT = process.env.PORT || PORT
const app = express()

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use( passport.initialize() );

app.get('/', (req, res) => {
  res.send(`Hello! The API is at http://localhost:${PORT}/api`);
});

// connect the api routes under /api/*
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT);
console.log(`There will be dragons: http://localhost:${PORT}`);