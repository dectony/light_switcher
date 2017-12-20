var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var houseSchema =  new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    occupants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('House', houseSchema);