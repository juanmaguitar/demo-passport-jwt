const JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
const User = require('../models/User');
const { secret: secretOrKey } = require('./db'); // get db config file

module.exports = function(passport) {
  passport.use( new JwtStrategy({ secretOrKey }, (jwt_payload, done) => {
    User.findOne( {id: jwt_payload.id} )
      .then(user => {
        if (user) done(null, user);
        else done(null, false);
      })
      catch(err => done(err, false) )
  }) );
};