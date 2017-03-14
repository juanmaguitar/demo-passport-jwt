const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../../models/User');
const SECRET = process.env.SECRET

const jwtOptions = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

const strategy = new JwtStrategy( jwtOptions, (jwt_payload, done) => {
  User.findOne( { id: jwt_payload.id } )
    .then(user => {
      if (user) done(null, user);
      else done(null, false);
    })
    .catch(err => done(err, false) )
})

module.exports = strategy
