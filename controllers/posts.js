const express = require('express')
// const path = require('path')
// const crypto = require('crypto')
const multer = require('multer')
const upload = multer()
const s3Files = require('../config/s3Files')
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')
const router = express.Router()
const { requireToken } = require('../config/passport')
require('dotenv').config()

const User = require('../models/user')
const UserPost = require('../models/post_related_models/user_post/user_post')
const Post = require('../models/post_related_models/post')

// const userStorage = new GridFsStorage({
//     url: process.env.BLUCID_DATABASE_URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//                 return reject(err);
//             }
//             const filename = buf.toString('hex') + path.extname(file.originalname);
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'users'
//             };
//             resolve(fileInfo);
//             });
//         });
//     }
// });
// const userUpload = multer({ userStorage });

// const storage = new GridFsStorage({
//     url: process.env.BLUCID_DATABASE_URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//                 return reject(err);
//             }
//             const filename = buf.toString('hex') + path.extname(file.originalname);
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'posts'
//             };
//             resolve(fileInfo);
//             });
//         });
//     }
// });
// const upload = multer({ storage });

router.post('/upload/:email', upload.single('file'), async (req, res) => {
    try {
        const file = await s3Files(req.file)

        const newPost = {
            ...req.body,
            fileURL: file
        }

        const newUser = await User.findOneAndUpdate({ email: req.params.email }, { $push: { posts: newPost}})

        const newPost = await Post.create({
            ...req.body,
            fileURL: file
        })

        res.send('Bad')

    } catch (error) {
        console.error(error)
    }
} )

