const mongoose = require('../../../db/user_connection')

const userCommentSchema = new mongoose.Schema({
    author: { type: String, required: true},
    body: { type: String, required: true},
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    userPost: { type: mongoose.Schema.Types.ObjectId, ref: 'userPost'}
})

module.exports = userCommentSchema