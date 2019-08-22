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

let listener = io.listen(server);
let host;
let clients = [];

listener.on('connection', (socket) => {

    // Connect
    socket.on('connected', () => {

        // Host
        if (! host) {
            host = socket;
            socket.emit('connected', 'host');
            console.log('The host has connected.');
            return;
        }

        // Clients
        let client = new Client();
        socket.emit('connected', client);
        client.socket = socket;
        clients.push(client);
        console.log('A new client has connected: ' + client.id);
    });

    // Disconnect
    socket.on('disconnect', () => {

        // Host
        if (socket == host) {
            console.log('The host has disconnected.');
            host = null;
            return;
        }

        // Clients
        for (let i in clients) {
            if (socket != clients[i].socket)
                continue;

            console.log(clients[i].id + ' has disconnected.');
        }
    });

    // Spawn Cube
    socket.on('spawn', () => {
        console.log('New shape spawned');
        socket.emit('spawn');
    });
});