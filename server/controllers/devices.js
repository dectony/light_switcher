var mongoose = require('mongoose'),
    Device = mongoose.model('Device'),
    Room = mongoose.model('Room');

exports.getById = function (req, res) {
    var condition = {_id: req.params.id};
    Device.findOne(condition).exec(function (err, device) {
        res.send(device);
    })
}

exports.getDevices = function (req, res) {
    var condition = {room: req.params.id};
    Device.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.addDevice = function (req, res) {

    console.log('POST - /addDevice');
    var device = new Device();
    device.title = req.body.title;
    device.type = req.body.type;
    device.deviceId = req.body.deviceId;
    device.room = req.body.roomId;

    device.save(function (err, device) {
        if (err) {
            console.log('Error while saving device: ' + err);
            res.send({error: err});
            return;
        } else {
            Room.findOne({_id: device.room}).exec(function (err, room) {
                room.devices.push(device);
                room.save();
            });
            console.log("Device was added");
            return res.send({status: 'OK', device: device});
        }
    });

};