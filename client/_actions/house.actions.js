import { houseConstants } from '../_constants';
import { alertActions } from './';
import { houseService } from '../_services';

export const houseActions = {
    addNewHouse,
    getUserHouses,
    getHouse,
    delete: _delete
};

function addNewHouse(house) {
    return dispatch => {
        dispatch(request({ house }));

        houseService.addNewHouse(house)
            .then(
                house => {
                    dispatch(success(house.house));
                    //history.push('/houses');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }

    function request(house) { return { type: houseConstants.CREATE_REQUEST, house } }
    function success(house) { return { type: houseConstants.CREATE_SUCCESS, house } }
    function failure(error) { return { type: houseConstants.CREATE_FAILURE, error } }
}

function getUserHouses(userId) {
    return dispatch => {
        dispatch(request());

        houseService.getUserHouses(userId)
            .then(
                houses => dispatch(success(houses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: houseConstants.GET_HOUSES_REQUEST } }
    function success(houses) { return { type: houseConstants.GET_HOUSES_SUCCESS, houses } }
    function failure(error) { return { type: houseConstants.GET_HOUSES_FAILURE, error } }
}

function getHouse(houseId) {
    return dispatch => {
        dispatch(request());

        houseService.getHouseById(houseId)
            .then(
                house => dispatch(success(house)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: houseConstants.GET_HOUSE_REQUEST } }
    function success(house) { return { type: houseConstants.GET_HOUSE_SUCCESS, house } }
    function failure(error) { return { type: houseConstants.GET_HOUSE_FAILURE, error } }
}

function _delete(houseId) {
    return dispatch => {
        dispatch(request({ houseId }));

        houseService._delete(houseId)
            .then(
                house => {
                    dispatch(success(houseId));
                },
                error => {
                    dispatch(failure(error, houseId));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: houseConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: houseConstants.DELETE_SUCCESS, id } }
    function failure(error, id) { return { type: houseConstants.DELETE_FAILURE, error, id } }
}
