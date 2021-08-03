const mongoose = require('../../db/connection');

const commentSchema = new mongoose.Schema({
    author: { type: String, required: true},
    body: { type: String, required: true},
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
}, {
    timestamps: true
})

module.exports = commentSchema