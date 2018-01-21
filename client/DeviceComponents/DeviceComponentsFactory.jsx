import RelayComponent from './RelayComponent';
import IpCamComponent from './IpCamComponent';
import ClimateSensorComponent from './ClimateSensorComponent';


const deviceComponents = [
    RelayComponent,
    IpCamComponent,
    ClimateSensorComponent
];

module.exports.getDeviceComponentByType = (type) => deviceComponents.find(x => x.deviceTypes.includes(type));