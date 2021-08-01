require('dotenv').config()
const post_mongoose = require('mongoose')

const mongoURI = process.env.POST_COLLECTION_URL

post_mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

post_mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
post_mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

post_mongoose.connection.on('open', () => {
	console.log('✅ mongo connection made!');
});

module.exports = post_mongoose;