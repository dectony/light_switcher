var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarModel = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    mileage: {type: Number, required: true},
    year: {type: Number, required: true},
    color: {type: String},
    bodyStyle: {type: String},
    vin: {type: String},
    engine: {type: String},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {type: Date, default: Date.now}
});


var Car = mongoose.model('Car', CarModel);

module.exports.CarModel = CarModel;