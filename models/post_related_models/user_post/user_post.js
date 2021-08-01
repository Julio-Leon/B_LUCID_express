const userCommentSchema = require('./user_comment')
const mongoose = require('../../../db/connection')

const userPostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    videoURL: { type: String, required: true },
    user: { type: String, required: true },
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true },
    comments: [userCommentSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports =  userPostSchema