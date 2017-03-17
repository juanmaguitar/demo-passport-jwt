const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('./strategies/google.js')
const jwtStrategy = require('./strategies/jwt')

const User = require(__base + 'models/User')

passport.use( User.createStrategy() );
passport.use( jwtStrategy );
passport.use( GoogleStrategy );

module.exports = passport;