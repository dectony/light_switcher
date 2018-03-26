exports.getDeviceInfo = function(device) {
    switch (device.type){
        case 'one':
            return {...device, isEnabled: true};
        case 'two':
            return {...device, videoUrl: 'test'};
        case 'CLIMATE_SENSOR':
            return {...device, measures: {
                Temperature: Math.random() * 40,
                Humidity: Math.random() * 70
            }};
        default: return device;
    }
};

exports.getDeviceInfoFromBroker = function(device) {
    switch (device.deviceType){
        case 'one':
            return {...device, isEnabled: true};
        case 'two':
            return {...device, videoUrl: 'test'};
        case 'CLIMATE_SENSOR':
            const sensorData = JSON.parse(device.data);
            return {...device, measures: {
                Temperature: sensorData.T,
                Humidity: sensorData.H
            }};
        default: return device;
    }
};