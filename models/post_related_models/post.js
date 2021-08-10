const commentSchema = require('./comment')
const mongoose = require('../../db/connection')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    fileURL: String,
    fileType: String,
    description: { type: String, required: true},
    user: { type: String, required: true },
    likes: { type: Array, default: [] },
    comments: [commentSchema]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post