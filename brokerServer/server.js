const WebSocket = require('ws');
const mosca = require('mosca');

const ws = new WebSocket('ws://127.0.0.1:3030/?token=abc123');

const pubsubsettings = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

const moscaSettings = {
    port: 1883,			//mosca (mqtt) port
    backend: pubsubsettings	//pubsubsettings is the object we created above

};

const server = new mosca.Server(moscaSettings);	//here we start mosca
server.on('ready', setup);	//on init it fires up setup()

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.topic, packet.payload, client.id);
});


// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}


ws.on('open', function open() {
    ws.send('something');
});

ws.on('message', function incoming(data) {
    console.log(data);
});