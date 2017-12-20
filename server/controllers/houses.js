var mongoose = require('mongoose'),
    House = mongoose.model('House');

exports.getHouses = function (req, res) {
    House.find().exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getById = function (req, res) {
    var condition = {_id: req.params.id};
    House.findOne(condition).exec(function (err, home) {
        res.send(home);
    })
}

exports.getUserHouses = function (req, res) {
    var condition = {};
    condition = {occupants: req.params.id};
    House.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
};

/**
 * Creates a new home from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.createHouse = function (req, res) {

    console.log('POST - /createHouse');
    var house = new House();
    house.title = req.body.title;
    house.description = req.body.description;
    house.owner = req.body.owner._id;
    house.occupants.push(req.body.owner._id);

    house.save(function (err, house) {
        if (err) {
            console.log('Error while saving home: ' + err);
            res.send({error: err});
            return;
        } else {
            console.log("House was created");
            return res.send({status: 'OK', house: house});
        }
    });

};

exports.addNewHouse = function (req, res){
    console.log(req.body);

    var houseData = new {
        title: req.body.title,
        description: req.body.description,
        owner: req.body.owner,
        occupants: [req.body.owner]
    };

    House.create(houseData, function(err, house){
        if(err){
            res.status(400);
            return res.send({reason: err.toString()});
        }
        else{
            console.log("House was created");
            return res.send({status: 'OK', house: house});
        }
    })
};

/**
 * Delete a home by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.deleteHouse = function (req, res) {
    console.log("DELETE - /home/:id");
    return House.findById(req.params.id, function (err, home) {
        if (!home) {
            res.statusCode = 404;
            return res.send({error: 'Not found home'});
        }

        return home.remove(function (err) {
            if (!err) {
                console.log('home was removed');
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        })
    });
};