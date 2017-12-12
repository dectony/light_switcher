var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var homeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    occupants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdDate: {type: Date, default: Date.now}
});


var Home = mongoose.model('Home', homeSchema);

module.exports.HomeModel = homeSchema;