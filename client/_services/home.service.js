import { authHeader, config } from '../_helpers';

export const houseService = {
    addNewHouse,
    getUserHouses,
    getHouseById,
    _delete
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

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
