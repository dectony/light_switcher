var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema =  new Schema({
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