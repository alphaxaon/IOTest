const http = require('http');
const io = require('socket.io');
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
    		host = socket;

    		console.log('The host has connected.');

    		return true;
    	}
        
        console.log('A new client has connected.');
    });
});