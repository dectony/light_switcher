const mongoose = require('mongoose'),
    Device = mongoose.model('Device');


exports.getById = function (deviceId) {
    const condition = {deviceId: deviceId};
    return Device.findOne(condition);
};