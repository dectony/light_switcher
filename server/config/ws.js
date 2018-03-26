const WebSocket = require('ws');
const url = require('url'),
    deviceService = require('../services/devicesService');

const repository = require('../repositories/userRepository');

let wss;
let clients = [];
exports.Initialize = function(server) {
    wss = new WebSocket.Server({server});

    wss.on('connection', function connection(ws, req) {
        const location = url.parse(req.url, true);
        switch(location.query.type){
            case 'broker':
                clients.push({
                    brokerId: location.query.brokerId,
                    type: location.query.type,
                    ws
                });
                break;
            case 'client':
                let query = repository.getUserHouses(location.query.user);
                query.select('brokerId');
                query.exec(function (err,brokers) {
                    if(err){
                        return console.log(err);
                    }
                    clients.push({
                        userId: location.query.user,
                        type: location.query.type,
                        brokers: brokers.map(b=>b.brokerId),
                        ws
                    });
                });
                break;
            default:
                break;
        }


        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            let receivedData = JSON.parse(message);
            switch(receivedData.type){
                case 'DEVICE_UPDATE':
                    const device = deviceService.getDeviceInfoFromBroker(receivedData);
                    const client = clients.find(c =>c.type === 'client' &&
                        c.brokers.includes(receivedData.brokerId));
                    if(client){
                        client.ws.send(JSON.stringify(device));
                    }
                    break;
                default:
                    break;

            }
        });

        ws.on('error', function (e) {
            clients.splice(clients.find(x => x.ws === ws));
            console.error(e.message);
        });

        //ws.send('something');
    });
};
exports.Send = function(message) {
    clients.forEach((ws)=> ws.send(message));
};

exports.Server = wss;