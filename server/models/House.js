const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema =  new Schema({
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
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('House', houseSchema);