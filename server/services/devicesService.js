exports.getDeviceInfo = function(device) {
    switch (device.type){
        case 'RELAY':
            if(device.value){
                return {...device, isEnabled: device.value === '1'}
            }
            return {...device, isEnabled: true};
        case 'two':
            return {...device, videoUrl: 'test'};
        case 'CLIMATE_SENSOR':
            let measures = {};
            if(device.value){
                const sensorData = JSON.parse(device.value);
                measures = {
                    Temperature: sensorData.T,
                    Humidity: sensorData.H
                };
            }else{
                measures = {
                    Temperature: 0,
                    Humidity: 0
                };
            }
            return {...device, measures: measures};
        default: return device;
    }
};

exports.getDeviceInfoFromBroker = function(device) {
    switch (device.deviceType){
        case 'RELAY':
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