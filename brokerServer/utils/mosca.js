const mosca = require('mosca'),
    mongoose = require('mongoose'),
    Device = mongoose.model('Device');

module.exports = function(){
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
        addDevice(client);
        console.log('client connected', client.id);
    });

// fired when a message is received
    server.on('published', function(packet, client) {
        console.log('Published', packet.topic);
        if(client && client.id)
            updateDeviceValue(client.id, "test");
    });

    function updateDeviceValue(deviceId, value){
        Device.findOne({deviceId: deviceId}).exec(function (err, device) {
            if (err) {
                console.log("Device not found", err);
            }else{
                device.value = value;
                device.save(function (err, updatedDevice) {
                    if (err){
                        console.log("Update failed", err)
                    }else{
                        console.log("Device was updated")
                    }
                });
            }
        });
    }
    function addDevice(client) {
        console.log('add device');
        const device = new Device();
        device.title = 'test';
        device.type = 'test';
        device.deviceId = client.id;
        device.save(function (err, device) {
            if (err) {
                if(err.toString().indexOf('E11000') > 1){
                    err = new Error('Duplicate user');
                }
                console.log('Error while saving device: ' + err);
            } else {
                console.log("Device was added");
            }
        });
    };
    // fired when the mqtt server is ready
    function setup() {
        console.log('Mosca server is up and running')
    }
};