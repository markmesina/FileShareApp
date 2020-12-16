const User = require('../models/User')
const { SECRET } = require('../config')
const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((then) => {
    done(null, user)
  })
})

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await User.findById(payload._id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => {
          return done(null, false)
        })
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: process.env.googleCallbackURI,
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id })
          if (existingUser) {
            return done(null, existingUser)
          }
          const user = await new User({
            googleId: profile.id,
            profilePhoto: `${profile.photos[0].value}?sz=50`,
          }).save()
          done(null, user)
        } catch (err) {
          done(err, null)
        }
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.facebookAppId,
        clientSecret: process.env.facebookAppSecret,
        callbackURL: process.env.facebookCallbackURI,
        profileFields: ["id", "picture", "email"],
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ facebookId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const user = await new User({
            facebookId: profile.id,
            profilePhoto: profile.photos[0].value
          }).save();
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
}
