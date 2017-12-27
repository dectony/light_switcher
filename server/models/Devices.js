var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema =  new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Device', deviceSchema);