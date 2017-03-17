const express = require('express')
const router = express.Router()

const passport = require(__base + 'config/passport')

const register = require('./handlers/register')
const login = require('./handlers/login')
const googleCallback = require('./handlers/googleCallback')

const scope = 'profile email'
const failureRedirect= '/login'
const session = false

router.use( passport.initialize() )

router.post('/register', register )
router.post('/login', passport.authenticate('local', { session }), login)

router.get('/google', passport.authenticate('google', { scope }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect, session }), googleCallback );

module.exports = router