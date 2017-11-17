var mongoose = require('mongoose'),
    CarModel = require('../models/Car'),
    Car = mongoose.model('Car');



exports.getCars = function (req, res) {
    var condition = {};
    if(req.user && !req.user.hasRole('admin')) {
        condition = {createdBy: req.user._id};
    }
    Car.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
}

exports.getCarById = function (req, res) {
    var condition = {_id: req.params.id};
    if(req.user && !req.user.hasRole('admin')) {
        condition.createdBy = req.user._id;
    }
    Car.findOne(condition).exec(function (err, car) {
        res.send(car);
    })
}

/**
 * Creates a new car from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.addCar = function (req, res) {

    console.log('POST - /addCar');

    var car = new Car({
        title: req.body.title,
        description: req.body.description,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        year: req.body.year,
        color: req.body.color,
        bodyStyle: req.body.bodyStyle,
        vin: req.body.vin,
        engine: req.body.engine,
        createdBy: req.body.user_id
    });

    car.save(function (err) {
        if (err) {
            console.log('Error while saving car: ' + err);
            res.send({error: err});
            return;
        } else {
            console.log("Car created");
            return res.send({status: 'OK', car: car});
        }
    });

};

/**
 * Update a car by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.updateCar = function (req, res) {

    console.log("PUT - /car/:id");
    return Car.findById(req.params.id, function (err, car) {

        if (!car) {
            res.statusCode = 404;
            return res.send({error: 'Not found Car'});
        }

        if (req.body.title != null) car.title = req.body.title;
        if (req.body.description != null) car.description = req.body.description;
        if (req.body.make != null) car.make = req.body.make;
        if (req.body.model != null) car.model = req.body.model;
        if (req.body.mileage != null) car.mileage = req.body.mileage;
        if (req.body.year != null) car.year = req.body.year;
        if (req.body.color != null) car.color = req.body.color;
        if (req.body.bodyStyle != null) car.bodyStyle = req.body.bodyStyle;
        if (req.body.vin != null) car.vin = req.body.vin;
        if (req.body.engine != null) car.engine = req.body.engine;

        return car.save(function (err) {
            if (!err) {
                console.log('Updated Car');
                return res.send({status: 'OK', car: car});
            } else {
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                console.log('Internal error(%d): %s', res.statusCode, err.message);
            }
            res.send(car);
        });
    });
};

/**
 * Delete a car by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.deleteCar = function(req, res) {

    console.log("DELETE - /car/:id");
    return Car.findById(req.params.id, function(err, car) {
        if(!car) {
            res.statusCode = 404;
            return res.send({ error: 'Not found car' });
        }

        return car.remove(function(err) {
            if(!err) {
                console.log('Removed car');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        })
    });
};