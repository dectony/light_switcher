var mongoose = require('mongoose'),
    BidModel = require('../models/Bid'),
    Bid = mongoose.model('Bid');



exports.getBids = function (req, res) {
    var condition = {};
    if(req.user && !req.user.hasRole('admin')) {
        condition = {createdBy: req.user._id};
    }
    Bid.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
}

exports.getBidsByAuction = function (req, res) {
    var condition = {};
    if(req.user && !req.user.hasRole('admin')) {
        condition = {createdBy: req.user._id};
    }
    condition.auction = req.auction_id;
    Bid.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
}

exports.getLastBidByAuction = function (req, res) {
    var condition = {auction: req.params.id};
    if(req.user && !req.user.hasRole('admin')) {
        condition.createdBy = req.user._id;
    }

    Bid.findOne(condition).sort({"createdDate": -1}).limit(1).exec(function (err, Bid) {
        res.send(Bid);
    })
}

/**
 * Creates a new Bid from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.addBid = function (req, res) {

    console.log('POST - /addBid');

    var bid = new Bid({
        createdBy: req.body.user,
        auction: req.body.auction,
        bidValue: req.body.bidValue
    });

    bid.save(function (err) {
        if (err) {
            console.log('Error while saving Bid: ' + err);
            res.send({error: err});
            return;
        } else {
            console.log("Bid created");
            return res.send({status: 'OK', Bid: Bid});
        }
    });

};

/**
 * Update a Bid by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.updateBid = function (req, res) {

    console.log("PUT - /Bid/:id");
    return Bid.findById(req.params.id, function (err, Bid) {

        if (!Bid) {
            res.statusCode = 404;
            return res.send({error: 'Not found Bid'});
        }

        if (req.body.title != null) Bid.title = req.body.title;
        if (req.body.description != null) Bid.description = req.body.description;
        if (req.body.make != null) Bid.make = req.body.make;
        if (req.body.model != null) Bid.model = req.body.model;
        if (req.body.mileage != null) Bid.mileage = req.body.mileage;
        if (req.body.year != null) Bid.year = req.body.year;
        if (req.body.color != null) Bid.color = req.body.color;
        if (req.body.bodyStyle != null) Bid.bodyStyle = req.body.bodyStyle;
        if (req.body.vin != null) Bid.vin = req.body.vin;
        if (req.body.engine != null) Bid.engine = req.body.engine;

        return Bid.save(function (err) {
            if (!err) {
                console.log('Updated Bid');
                return res.send({status: 'OK', Bid: Bid});
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
            res.send(Bid);
        });
    });
};

/**
 * Delete a Bid by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.deleteBid = function(req, res) {

    console.log("DELETE - /Bid/:id");
    return Bid.findById(req.params.id, function(err, Bid) {
        if(!Bid) {
            res.statusCode = 404;
            return res.send({ error: 'Not found Bid' });
        }

        return Bid.remove(function(err) {
            if(!err) {
                console.log('Removed Bid');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        })
    });
};