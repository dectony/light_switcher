import { authHeader, config } from '../_helpers';

export const deviceService = {
    addDevice,
    getDevices,
    getDeviceById,
    updateDeviceState,
    _delete,
};


function addDevice(device){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device)
    };

    return fetch(config.apiUrl + '/api/devices', requestOptions).then(handleResponse);
}

function getDevices(houseId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/devices/' + houseId, requestOptions).then(handleResponse);
}

function getDeviceById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/device/' + id, requestOptions).then(handleResponse);
}

function updateDeviceState(id){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device)
    };

    return fetch(config.apiUrl + '/api/device/' + id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/devices/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
