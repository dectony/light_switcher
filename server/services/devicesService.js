exports.getDeviceInfo = function(device) {
    switch (device.type){
        case 'one':
            return {...device, isEnabled: true};
        case 'two':
            return {...device, videoUrl: 'test'};
        case 'three':
            return {...device, measures: {
                Temperature: Math.random() * 40,
                Humidity: Math.random() * 70
            }};
        default: return device;
    }
};