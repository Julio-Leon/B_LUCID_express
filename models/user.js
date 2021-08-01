const userPostSchema = require('./post_related_models/user_post/user_post')
const mongoose = require('../db/connection')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: String,
    imageURL: String,
    bannerURL: String,
    posts: [userPostSchema]
}, {
    timestamps: true
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User', userSchema)

module.exports = User