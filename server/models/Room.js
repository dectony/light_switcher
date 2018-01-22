const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema =  new Schema({
    title: {type: String, required: true},
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    },
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }]
});

module.exports = mongoose.model('Room', roomSchema);