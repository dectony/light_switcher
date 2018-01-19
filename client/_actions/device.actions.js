import { deviceConstants } from '../_constants';
import { alertActions } from './';
import { deviceService } from '../_services';

export const devicesActions = {
    addDevice,
    getDevices,
    getDevice,
    delete: _delete
};

function addDevice(device) {
    return dispatch => {
        dispatch(request({ device }));

        deviceService.addDevice(device)
            .then(
                device => {
                    dispatch(success(device.device));
                    //history.push('/houses');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }

    function request(device) { return { type: deviceConstants.CREATE_REQUEST, device } }
    function success(device) { return { type: deviceConstants.CREATE_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.CREATE_FAILURE, error } }
}

function getDevices(roomId) {
    return dispatch => {
        dispatch(request());

        deviceService.getDevices(roomId)
            .then(
                devices => dispatch(success(devices)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: deviceConstants.GET_DEVICES_REQUEST } }
    function success(devices) { return { type: deviceConstants.GET_DEVICES_SUCCESS, devices } }
    function failure(error) { return { type: deviceConstants.GET_DEVICES_FAILURE, error } }
}

function getDevice(deviceId) {
    return dispatch => {
        dispatch(request());

        deviceService.getDeviceById(deviceId)
            .then(
                device => dispatch(success(device)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: deviceConstants.GET_DEVICE_REQUEST } }
    function success(device) { return { type: deviceConstants.GET_DEVICE_SUCCESS, device } }
    function failure(error) { return { type: deviceConstants.GET_DEVICE_FAILURE, error } }
}

function _delete(deviceId) {
    return dispatch => {
        dispatch(request({ deviceId }));

        deviceService._delete(deviceId)
            .then(
                device => {
                    dispatch(success(deviceId));
                },
                error => {
                    dispatch(failure(error, deviceId));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: deviceConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: deviceConstants.DELETE_SUCCESS, id } }
    function failure(error, id) { return { type: deviceConstants.DELETE_FAILURE, error, id } }
}
