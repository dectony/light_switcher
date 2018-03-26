const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    House = mongoose.model('House');


exports.getUsers = function () {
    User.find({});
};

exports.getUserHouses = function (userId) {
    const condition = {occupants: userId};
    return House.find(condition).lean();
};