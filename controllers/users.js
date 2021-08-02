const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { requireToken, createUserToken } = require('../config/passport')
const passport = require('../config/google_passport')

const saltRounds = 10;

const User = require('../models/user')
const { findOne } = require('../models/user')

router.get('/:email', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failed'
}), (req, res) => {
    res.send(req.user)
})

// router.get('/failed', (req, res) => {
//     res.send("Failed!")
// })

// router.get('/succeed', isLoggedIn, (req, res) => {
//     res.send("Welcome!")
// })

router.get('/logout', (req, res) => {
    req.session = null
    req.logout()
})

// Register
router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body
    let errors = []

    if (!username || !email || !password || !rePassword) {
        errors.push({
            message: 'Please fillin all fields'
        })
    }
// GET LOGIN ROUTES FROM GITHUB
    if (password !== rePassword) {
        errors.push({
            message: 'Passwords do not match'
        })
    }

    if (password.length < 8) {
        errors.push({
            message: 'Password should be at least 8 characters'
        })
    }

    if (errors.length > 0) {
        // Letting front end deal with this
        res.send(errors)
    }
    try {
        const userEmailCheck = await User.findOne({ email: email })
        if (userEmailCheck) {
            errors.push({
                message: "user with this email address already exists!"
            })
            res.send(errors)
            const user = await User.findOne({ email: email })
        }
        const userUsernameCheck = await User.findOne({ username: username })
        if (userUsernameCheck) {
            errors.push({
                message: "user with this username already exists!"
            })
            res.send(errors)
        } else {
        
            const newUser = {
                username,
                email,
                password
            }

            bcrypt.hash(newUser.password, saltRounds, async (error, hash) => {
                try {
                    console.log(hash)
                    const user = await User.create({
                        username: newUser.username,
                        email: newUser.email,
                        password: hash
                    })
                    console.log(user)
                    res.json(user)
                } catch (error) {
                    console.error(error) 
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const token = createUserToken(req, user)
        res.json({ token, user })
    } catch (error) {
        next(error)
    }
})

module.exports = router