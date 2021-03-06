const mongoose = require('mongoose'),
    userModel = require('../models/User'),
    houseModel = require('../models/House'),
    roomModel = require('../models/Room'),
    deviceModel = require('../models/Device');

module.exports = function(config) {
    mongoose.connect(config.db);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('PR3 db opened');
    });

    userModel.createDefaultUsers();

    //userModel.doSomeTests();
};