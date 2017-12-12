var mongoose = require('mongoose'),
    HomeModel = require('../models/Home'),
    Home = mongoose.model('Home');


exports.getHomes = function (req, res) {
    Home.find().exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getById = function (req, res) {
    var condition = {_id: req.params.id};
    Home.findOne(condition).exec(function (err, home) {
        res.send(home);
    })
}

exports.getUserHomes = function (req, res) {
    var condition = {};
    condition = {occupants: req.params.userId};
    Home.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
};

/**
 * Creates a new home from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.createHome = function (req, res) {

    console.log('POST - /createHome');

    var home = new Home({
        title: req.body.title,
        description: req.body.description,
        occupants: [req.body.user_id]
    });

    home.save(function (err) {
        if (err) {
            console.log('Error while saving home: ' + err);
            res.send({error: err});
            return;
        } else {
            console.log("Home was created");
            return res.send({status: 'OK', home: home});
        }
    });

};

/**
 * Delete a home by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.deleteHome = function (req, res) {
    console.log("DELETE - /home/:id");
    return Home.findById(req.params.id, function (err, home) {
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