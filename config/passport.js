const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models/User');
const { secret } = require('./db'); // get db config file

module.exports = function(passport) {
  const opts = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }
  passport.use( new JwtStrategy( opts, (jwt_payload, done) => {
    User.findOne( { id: jwt_payload.id } )
      .then(user => {
        if (user) done(null, user);
        else done(null, false);
      })
      .catch(err => done(err, false) )
  }) )
};