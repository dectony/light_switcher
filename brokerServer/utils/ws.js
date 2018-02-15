const WebSocket = require('../node_modules/ws');

module.exports = function () {
    const ws = new WebSocket('ws://127.0.0.1:3030/?token=abc123');

    ws.on('open', function open() {
        ws.send('something');
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });
};