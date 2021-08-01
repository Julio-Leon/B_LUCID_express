const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
require('dotenv').config()

const User = require('../models/user')

const secret = 'ilovemadelinecastro'

const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
	secretOrKey: secret,
};

const strategy = new JWTStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {

        if (err) {
            return done(err, false)
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    })
})

passport.use(strategy)
passport.initialize();

const requireToken = passport.authenticate('jwt', {
    session: false
})

const createUserToken = (req, user) => {
    if (!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)) {
        const error = new Error('The provided username or password is incorrect')
        throw error
    }
    return jwt.sign(user, secret, { expiresIn: 3600})
}

module.exports = {
    requireToken,
    createUserToken
}