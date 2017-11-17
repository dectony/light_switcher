var mongoose = require('mongoose'),
    AuctionModel = require('../models/Auction'),
    Auction = mongoose.model('Auction');


exports.getAuctions = function (req, res) {
    Auction.find().exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getAuctionsByUser = function (req, res) {
    var condition = {};
    if (req.user && !req.user.hasRole('admin')) {
        condition = {createdBy: req.params.userId};
    }
    Auction.find(condition).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getAuctionById = function (req, res) {
    var condition = {_id: req.params.id};
    if (req.user && !req.user.hasRole('admin')) {
        condition.createdBy = req.user._id;
    }
    Auction.findOne(condition).populate('car').exec(function (err, auction) {
        res.send(auction);
    })
};

/**
 * Creates a new auction from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.addAuction = function (req, res) {

    console.log('POST - /addAuction');

    var auction = new Auction({
        title: req.body.title,
        description: req.body.description,
        car: req.body.car,
        createdBy: req.body.user_id,
        finishDate: new Date(req.body.finishDate),
        price: req.body.price
    });

    auction.save(function (err) {
        if (err) {
            console.log('Error while saving auction: ' + err);
            res.send({error: err});
            return;
        } else {
            console.log("Auction created");
            return res.send({status: 'OK', auction: auction});
        }
    });

};

/**
 * Update a auction by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.updateAuction = function (req, res) {

    console.log("PUT - /auction/:id");
    return Auction.findById(req.params.id, function (err, auction) {

        if (!auction) {
            res.statusCode = 404;
            return res.send({error: 'Not found Auction'});
        }

        if (req.body.title != null) auction.title = req.body.title;
        if (req.body.description != null) auction.description = req.body.description;
        if (req.body.car != null) auction.car = req.body.car;
        if (req.body.price != null) auction.price = req.body.price;
        if (req.body.finishDate != null) auction.finishDate = req.body.finishDate;

        return auction.save(function (err) {
            if (!err) {
                console.log('Updated Auction');
                return res.send({status: 'OK', auction: auction});
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
            res.send(auction);
        });
    });
};

/**
 * Delete a auction by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.deleteAuction = function (req, res) {
    console.log("DELETE - /auction/:id");
    return Auction.findById(req.params.id, function (err, auction) {
        if (!auction) {
            res.statusCode = 404;
            return res.send({error: 'Not found auction'});
        }

        return auction.remove(function (err) {
            if (!err) {
                console.log('Removed auction');
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        })
    });
};