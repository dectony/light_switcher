const WebSocket = require('ws');
const url = require('url');

let wss;
let clients = [];
exports.Initialize = function(server) {
    wss = new WebSocket.Server({server});

    wss.on('connection', function connection(ws, req) {
        clients.push(ws);
        const location = url.parse(req.url, true);
        // You might use location.query.access_token to authenticate or share sessions
        // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.on('error', function (e) {
            clients.splice(ws);
            console.error(e.message);
        });

        ws.send('something');
    });
};
exports.Send = function(message) {
    clients.forEach((ws)=> ws.send(message));
};

exports.Server = wss;