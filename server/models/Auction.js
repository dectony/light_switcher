var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuctionModel = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    createdDate: {type: Date, default: Date.now},
    finishDate: {type: Date}
});


var Auction = mongoose.model('Auction', AuctionModel);

module.exports.AuctionModel = AuctionModel;