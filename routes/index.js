const express = require('express')
const User = require('../models/User');
const router = express.Router()

// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({ success: false, msg: 'Please pass name and password.' });
  }
  else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router
