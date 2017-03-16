const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({});

const options = {
  usernameField: 'email',
  attemptsField: 3,
  usernameLowerCase: true
}

User.plugin( passportLocalMongoose, options );

module.exports = mongoose.model('User', User);