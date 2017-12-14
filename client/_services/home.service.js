import { authHeader, config } from '../_helpers';

export const houseService = {
    addNewHouse,
    getUserHouses
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

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}