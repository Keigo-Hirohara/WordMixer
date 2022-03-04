const http = require('http');

const app = require('./app');
const {connectMongo} = require('./services/mongo');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;



const startServer = async () => {
    await connectMongo();

    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

startServer();