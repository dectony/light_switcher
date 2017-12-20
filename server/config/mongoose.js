var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    houseModel = require('../models/House');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('PR3 db opened');
    });

    userModel.createDefaultUsers();
}