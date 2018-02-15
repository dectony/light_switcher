const mongoose = require('mongoose'),
    deviceModel = require('../models/Device');

module.exports = function(config) {
    mongoose.connect(config.db);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('broker db is opened');
    });
};