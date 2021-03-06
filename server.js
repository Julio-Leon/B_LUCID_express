require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
require('./config/google_passport')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))
app.set('view engine', 'react-native')

app.use(session({ secret: 'cats' }))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/home')
})

const UserController = require('./controllers/users');
app.use('/users', UserController)

const PostController = require('./controllers/posts');
app.use('/posts', PostController)

app.listen(PORT, () => {
    console.log('D-LUCID API is running on port:', PORT)
})