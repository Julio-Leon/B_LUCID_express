const commentSchema = require('./comment')
const mongoose = require('../../db/connection')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    videoURL: { type: String, required: true },
    user: { type: String, required: true },
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true },
    comments: [commentSchema]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post