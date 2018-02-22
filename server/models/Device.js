const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema =  new Schema({
    title: {type: String, required: true},
    deviceId: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    value: {type: String, required: false},
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Device', deviceSchema);