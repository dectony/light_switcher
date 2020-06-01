const mongoose = require('mongoose'),
    Device = mongoose.model('Device');


exports.getById = function (deviceId) {
    const condition = {deviceId: deviceId};
    return Device.findOne(condition);
};

exports.updateDeviceValue = function (deviceId, value) {
    Device.findOne({deviceId: deviceId}).exec(function (err, device) {
        if (err) {
            console.log("Device not found", err);
        }else{
            device.value = value;
            device.save(function (err, updatedDevice) {
                if (err){
                    console.log("Update failed", err)
                }else{
                    console.log("Device was updated")
                }
            });
        }
    });
};