const express = require('express')
const jwt = require('jwt-simple');
const passport = require('passport')
const useJwtStrategy = require('./config/passport')

const User = require('../../models/User');
const config = require('../../config/db')

const router = express.Router()

router.use( passport.initialize() );

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  const account = new User({ username })

  User.register( account, password, err => {
    if (err) {
      return res.json({success: false, msg: 'Username already exists.'});
    }
    res.json({success: true, msg: 'Successful created new user.'});
  });
})

router.post('/authenticate', passport.authenticate('local'), function(req, res) {

  const SECRET = config.secret;
  const { _id: id } = req.user;

  var token = jwt.encode( { id }, SECRET );
  res.json({success: true, token: 'JWT ' + token});

});

return router
