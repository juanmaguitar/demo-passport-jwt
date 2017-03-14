const express = require('express');
const router = express.Router();

const passport = require('../_passport')

const home = require('./handlers/home')

// all these routes require JWT token
router.use( passport.authenticate('jwt', { session: false }) )

router.get("/", home );

module.exports = router;