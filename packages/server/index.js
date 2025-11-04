const http = require('http');
const { WebSocketServer } = require('ws');
const url = require('url');
const uuidv4 = require('uuid').v4;


const server = http.createServer();
const wss = new WebSocketServer({ server });
const connections = {}
const users = {}


const broadcast = (message) => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
    })    
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];

    user.state = message
    broadcast();

    console.log(`${user.username} updated state:`, JSON.stringify(user.state));
}

const handleClose = (uuid) => {
    console.log(`Connection closed for user: ${users[uuid].username} with UUID: ${uuid}`);
    delete connections[uuid];
    delete users[uuid];
    broadcast();
}


wss.on('connection', (connection, request) => {
    const { username } = url.parse(request.url, true).query;
    const uuid = uuidv4();

    console.log(`New connection from user: ${username} with UUID: ${uuid}`);

    connections[uuid] = connection;

    users[uuid] = { 
        username: username,
        state: {}
    };

    connection.on('message', message => handleMessage(message, uuid));

    connection.on('close', () => handleClose(uuid));
});


server.listen(8080, () => {
  console.log('WebSocket server is listening on ws://localhost:8080');
});
