const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')
require('dotenv').config()

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "http://localhost:4000/users/google/callback",
    callbackURL: "https://boiling-caverns-35260.herokuapp.com/users/google/callback"
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

module.exports = passport