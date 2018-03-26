const constants  = require('../helpers/constants').constants;


const WebSocket = require('../node_modules/ws/index.js');
let ws;
exports.Initialize = function () {
    ws = new WebSocket('ws://127.0.0.1:3030/?brokerId=' + constants.BROKER_ID + '&type=broker');

    ws.on('open', function open() {
        let dataToSend = {
            brokerId: constants.BROKER_ID,
            message: 'Just connected'
        };
        ws.send(JSON.stringify(dataToSend));
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });
};

exports.SendData = function (data, deviceId) {
    let dataToSend = {
        brokerId: constants.BROKER_ID,
        deviceId: deviceId,
        data: data,
        type: 'DEVICE_UPDATE',
        deviceType: 'CLIMATE_SENSOR'
    };
    ws.send(JSON.stringify(dataToSend));
};