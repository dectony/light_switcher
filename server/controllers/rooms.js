const mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    House = mongoose.model('House'),
    deviceService = require('../services/devicesService');

exports.getById = function (req, res) {
    const condition = {_id: req.params.id};
    Room.findOne(condition).exec(function (err, room) {
        res.send(room);
    })
};

exports.getRooms = function (req, res) {
    const condition = {house: req.params.id};
    Room.find(condition).populate('devices').lean().exec(function (err, collection) {
        let result =collection.map((room) => {return {...room, devices: room.devices.map((device) => deviceService.getDeviceInfo(device))}}) ;
        //let result ={...result, rooms:collection.map((room) => {...room, devices: devices.map((device) => deviceService.getDeviceInfo(device)))}} ;
        res.send(result);
    })
};

exports.addRoom = function (req, res) {

    console.log('POST - /addRoom');
    const room = new Room();
    room.title = req.body.title;
    room.house = new mongoose.mongo.ObjectId(req.body.house);

    room.save(function (err, room) {
        if (err) {
            console.log('Error while saving room: ' + err);
            return res.send({error: err});
        } else {
            House.findOne({_id: room.house}).exec(function (err, home) {
                home.rooms.push(room);
                home.save();
            });
            console.log("Room was created");
            return res.send({status: 'OK', room: room});
        }
    });

};

exports.deleteRoom = function (req, res) {
    console.log("DELETE - /home/:id");
    return Room.findById(req.params.id, function (err, room) {
        if (!room) {
            res.statusCode = 404;
            return res.send({error: 'Not found room'});
        }

        return room.remove(function (err) {
            if (!err) {
                console.log('room was removed');
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        })
    });
};