const WebSocket = require('../node_modules/ws/index.js');
let ws;
exports.Initialize = function () {
    ws = new WebSocket('ws://127.0.0.1:3030/?token=abc123');

    ws.on('open', function open() {
        ws.send('something');
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });
};

exports.SendData = function (data) {
    ws.send(data);
};