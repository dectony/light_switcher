const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema =  new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    brokerId: {type: String, required: true},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    occupants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: "Room"
    }],
    createdDate: {type: Date, default: Date.now}
},{ usePushEach: true });

module.exports = mongoose.model("House", houseSchema);