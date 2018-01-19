import { authHeader, config } from '../_helpers';

export const houseService = {
    addNewHouse,
    getUserHouses,
    getHouseById,
    _delete,
    addRoom,
    getRooms,
    getRoomById,
    deleteRoom
};

function addNewHouse(house){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(house)
    };

    return fetch(config.apiUrl + '/api/houses', requestOptions).then(handleResponse);
}

function getUserHouses(userId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/houses/' + userId, requestOptions).then(handleResponse);
}

function getHouseById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/house/' + id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/houses/' + id, requestOptions).then(handleResponse);
}

function addRoom(room){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room)
    };

    return fetch(config.apiUrl + '/api/rooms', requestOptions).then(handleResponse);
}

function getRooms(houseId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/rooms/' + houseId, requestOptions).then(handleResponse);
}

function getRoomById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/rooms/' + id, requestOptions).then(handleResponse);
}

function deleteRoom(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/rooms/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
