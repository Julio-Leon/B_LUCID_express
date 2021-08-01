require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.listen(PORT, () => {
    console.log('D-LUCID API is running on port:', PORT)
})