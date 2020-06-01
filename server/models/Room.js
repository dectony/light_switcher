const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema =  new Schema({
    title: {type: String, required: true},
    house: {
        type: Schema.Types.ObjectId,
        ref: "House"
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
}, { usePushEach: true });

module.exports = mongoose.model("Room", roomSchema);