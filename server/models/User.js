const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  passwordResetToken: String,
  passwordResetExpires: Date,

  google: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

const options = {
  usernameField: 'email',
  usernameUnique: true,
  usernameLowerCase: true
}

userSchema.plugin( passportLocalMongoose, options );

module.exports = mongoose.model('User', userSchema);

