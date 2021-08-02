const userCommentSchema = require('./user_comment')
const mongoose = require('../../../db/connection')

const userPostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    fileURL: { type: String, required: true },
    user: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [userCommentSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports =  userPostSchema