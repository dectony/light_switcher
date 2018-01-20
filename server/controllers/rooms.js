var mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    House = mongoose.model('House');

exports.getById = function (req, res) {
    var condition = {_id: req.params.id};
    Room.findOne(condition).exec(function (err, room) {
        res.send(room);
    })
}

exports.getRooms = function (req, res) {
    var condition = {};
    condition = {house: req.params.id};
    Room.find(condition).populate('devices').exec(function (err, collection) {
        res.send(collection);
    })
};

exports.addRoom = function (req, res) {

    console.log('POST - /addRoom');
    var room = new Room();
    room.title = req.body.title;
    room.house = new mongoose.mongo.ObjectId(req.body.house);

    room.save(function (err, room) {
        if (err) {
            console.log('Error while saving room: ' + err);
            res.send({error: err});
            return;
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