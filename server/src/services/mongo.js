const mongoose = require('mongoose');

require('dotenv').config();

const mongoURL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('mongo connection is ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
})

const connectMongo = async () => {
    await mongoose.connect(mongoURL);
    return mongoose;
}

const disconnectMongo = async () => {
    await mongoose.disconnect(mongoURL);
}

module.exports = {connectMongo, disconnectMongo};