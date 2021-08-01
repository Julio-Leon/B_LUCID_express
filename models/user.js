const userPostSchema = require('./post_related_models/user_post/user_post')
const mongoose = require('../db/user_connection')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    image: { type: String, required: true},
    banner: { type: String, required: true},
    posts: [userPostSchema]
})