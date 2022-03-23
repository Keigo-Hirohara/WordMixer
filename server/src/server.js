const http = require('http');

const app = require('./app');
const {connectMongo} = require('./services/mongo');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
  });

const startServer = async () => {
    await connectMongo();

    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

startServer();