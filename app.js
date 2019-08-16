const http = require('http');
const io = require('socket.io');
const Client = require('./client.js');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Websocket server is up and running.\n');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

let websockets = io.listen(server);
let host;

websockets.on('connection', (socket) => {

	// Connections
    socket.on('connected', () => {
    	if (!host) {
            host = socket.emit('host-connected');
    		console.log('The host has connected.');
    		return true;
    	}

        let client = new Client();
        socket.emit('client-connected', client);
        console.log('A new client has connected.');
    });
});