const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require(__base + 'models/User')

const googleOptions = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}

// const MSG_EXISTING_GOOGLE = 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
// const MSG_LINKED = 'Google account has been linked.'
// const MSG_EXISTING_EMAIL = 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'

const strategy = new GoogleStrategy( googleOptions, handleStrategy)

function handleStrategy (req, accessToken, refreshToken, profile, done) {

    const google = profile.id
    const email = profile.emails[0].value

    User.findOne({ google })
      .then( existingUser => {
        if (existingUser) return done(null, existingUser)
        User.findOne({ email })
          .then( existingEmailUser => {
            if (existingEmailUser) return done(null, existingEmailUser)
            createUser(profile, accessToken)
              .then( user => done(null, user) )
              .catch(done)
          })
          .catch(done)
      })
      .catch(done)

}


function createUser(profile, accessToken) {
  const email = profile.emails[0].value
  let user = new User({ email })
  user.google = profile.id;
  user.tokens.push({ kind: 'google', accessToken });
  user.profile.name = user.profile.name || profile.displayName;
  user.profile.gender = user.profile.gender || profile._json.gender;
  user.profile.picture = user.profile.picture || profile._json.image.url;
  return user.save()
}


module.exports = strategy