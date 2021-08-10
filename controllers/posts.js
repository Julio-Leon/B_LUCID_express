const express = require('express')
const { v4: uuidv4} = require('uuid')

const multer = require('multer')
const upload = multer()
const s3Files = require('../config/s3Files')

const router = express.Router()
const { requireToken } = require('../config/passport')
require('dotenv').config()

const User = require('../models/user')
const Post = require('../models/post_related_models/post')

router.delete('/comment/:id')

router.post('/comment/:id', async (req, res) => {
    try {
        console.log(req.body)
        const newPost = await Post.findByIdAndUpdate(req.params.id, {$push: {comments: req.body}})
        console.log(newPost)
        res.status(201).json(newPost)
    } catch (error) {
        console.error(error)
    }
})

router.get('/user/:username', async (req, res) => {
    try {
        const userPosts = await Post.find({ user: req.params.username })
        console.log(userPosts)
        res.status(201).json(userPosts)
    } catch (error) {
        console.error(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndRemove(req.params.id)
        res.status(204).json(deletedPost)
    } catch (error) {
        console.error(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const newPost = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        })
        console.log(newPost)
        res.status(201).json(newPost)
    } catch (error) {
        console.error(error)
    }
})

router.post('/decrement-like/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)

        const newLikes = post.likes.filter(like => like !== req.body.userID)

        const newPost = await Post.findByIdAndUpdate(req.params.id, {likes: newLikes})

        res.status(201)
    } catch (error) {
        console.error(error)
    }
})

router.post('/increment-like/:id', async (req, res) => {
    try {

        const newPost = await Post.findByIdAndUpdate(req.params.id, {
            $push: {likes: req.body.userID}
        })

        res.status(201)
    } catch (error) {
        console.error(error)
    }
})


router.post('/upload', async (req, res) => {
    try {

        const postUUID = uuidv4()

        const newPostBody = {
            title: req.body.title,
            description: req.body.description,
            fileURL: req.body.fileURL,
            fileType: req.body.fileType,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            user: req.body.user,
            postUUID: postUUID
        }
        const newPost = await Post.create(newPostBody)
        
        const updatedUser = await User.findByIdAndUpdate(req.body.userID, {$push: {posts: {...req.body, postUUID: postUUID}}})
        
        res.status(201).json({
            updatedUser: updatedUser,
            newPost: newPost
        })
        
    } catch (error) {
        console.error(error)
    }
})

router.get('/:first/:last', async (req, res, next) => {
    try {
        const posts = await Post.find()
        const returnPosts = posts.filter((post, i) => i >= Number(req.params.first) && i < Number(req.params.last))
        res.status(200).json(returnPosts)
    } catch (error) {
        next(error)
    }
})

router.post('/upload/:email', upload.single('file'), async (req, res) => {
    try {
        const file = await s3Files(req.body)

        const post = {
            ...req.body,
            fileURL: file
        }

        const newUser = await User.findOneAndUpdate({ email: req.params.email }, { $push: { posts: post}})

        const newPost = await Post.create({
            ...req.body,
            fileURL: file
        })

        res.status(201).json(newPost)

    } catch (error) {
        console.error(error)
    }
} )

module.exports = router