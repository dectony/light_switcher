var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BidModel = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    },
    bidValue: {type: Number},
    createdDate: {type: Date, default: Date.now}
});


var Bid = mongoose.model('Bid', BidModel);

module.exports.BidModel = BidModel;