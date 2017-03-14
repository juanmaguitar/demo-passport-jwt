const express = require('express');
const router = express.Router();

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const register = require('./handlers/register')
const authenticate = require('./handlers/authenticate')

const jwtStrategy = require('./strategies/jwt')

const User = require('../../models/User');

router.use( passport.initialize() );

passport.use( new LocalStrategy( User.authenticate() ) );
passport.use( jwtStrategy );

router.post('/register', register );
router.post('/authenticate', passport.authenticate('local', { session: false }), authenticate);

router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) =>
  res.json({ message: "Success! You can not see this without a token" })
);


//router.get('/logout', logout);

module.exports = router;