require('dotenv').config()
const user_mongoose = require('mongoose')

const mongoURI = process.env.BLUCID_DATABASE_URL

user_mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

user_mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongodb not running?'));
user_mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

user_mongoose.connection.on('open', () => {
	console.log('✅ mongo connection made!');
});

module.exports = user_mongoose;