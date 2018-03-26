const mongoose = require('mongoose'),
    Device = mongoose.model('Device'),
    Room = mongoose.model('Room'),
    House = mongoose.model('House'),
    deviceService = require('../services/devicesService'),
    wsSend = require('../config/ws').Send;

exports.getById = function (req, res) {
    const condition = {deviceId: req.params.id};
    Device.findOne(condition).lean().exec(function (err, device) {
        let wrappedDevice = deviceService.getDeviceInfo(device);
        console.log(wrappedDevice);
        res.send(wrappedDevice);
    })
};

exports.getDevices = function (req, res) {
    //wsSend('test');
    const condition = {room: req.params.id};
    Device.find(condition).lean().exec(function (err, collection) {
        res.send(collection.map((device) => deviceService.getDeviceInfo(device)));
    })
};

exports.getHouseDevices = function (req, res) {
    //wsSend('test');
    const condition = {_id: req.params.id};
    House.findOne(condition).exec(function (err, house) {
        Device.find({ room: {$in : house.rooms}}).lean().exec(function (err, collection) {
            res.send(collection.map((device) => deviceService.getDeviceInfo(device)));
        })
    });
};

exports.addDevice = function (req, res) {
    console.log('POST - /addDevice');
    const device = new Device();
    device.title = req.body.title;
    device.type = req.body.type;
    device.deviceId = req.body.deviceId;
    device.room = req.body.roomId;
    device.save(function (err, device) {
        if (err) {
            console.log('Error while saving device: ' + err);
            return res.send({error: err});
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

exports.updateDeviceValue = function (deviceId, value){
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