const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: '503113550973-utib4nomeecs41e5q3ddp0f4kojpinum.apps.googleusercontent.com',
    clientSecret: 'k7rElDO_96F_d4X4g5EZOCNc',
    callbackURL: "http://localhost:4000/users/google/callback"
  },
  async (token, tokenSecret, profile, done) => {
    console.log(profile)
    try {
        const user = await User.findOrCreate({ email: profile._json.email}, {
            username: profile.displayName,
            email: profile._json.email
        }, (err, user) => {
            return done(err, user);
        });
    } catch (error) {
        console.error(error)
    }
  }
));