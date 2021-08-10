const userCommentSchema = require('./user_comment')
const mongoose = require('../../../db/connection')

const userPostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    fileURL: String,
    fileType: String,
    description: { type: String, required: true},
    user: { type: String, required: true },
    likes: { type: Array, default: [] },
    comments: [userCommentSchema],
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports =  userPostSchema