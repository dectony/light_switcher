const mongoose = require('mongoose'),
    Device = mongoose.model('Device'),
    Room = mongoose.model('Room'),
    House = mongoose.model('House'),
    deviceService = require('../services/devicesService'),
    deviceRepository = require('../repositories/deviceRepository'),
    wsSend = require('../config/ws').Send;

exports.getById = function (req, res) {
    const condition = {_id: req.params.id};
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
    House.findOne(condition).populate("rooms").exec(function (err, house) {
        var test  = house.rooms.map((room)=> new mongoose.mongo.ObjectId(room._id));
        //var test  = [new mongoose.mongo.ObjectId("5ed2944beed50d76e884fc54")];
        Device.find({ room: {$in : test}}).lean().exec(function (err, collection) {
            var devices = collection.map((device) => deviceService.getDeviceInfo(device));
            res.send(devices);
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
                room.save(function(err,room){
                    if(err){
                        console.log('Error while saving device: ' + err);
                    }else{
                        console.log("Device was added to "+ room.title);
                    }
                });
            });
            console.log("Device was added");
            return res.send({status: 'OK', device: device});
        }
    });
};

exports.updateDeviceValue = function (req, res){
    deviceRepository(req.body.deviceId, req.body.value);
    res.send({status: 'OK'});
}