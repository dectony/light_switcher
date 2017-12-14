import { houseConstants } from '../_constants';
import { alertActions } from './';
import { houseService } from '../_services';

export const houseActions = {
    addNewHouse,
    getUserHouses
};

function addNewHouse(house) {
    return dispatch => {
        dispatch(request({ house }));

        houseService.addNewHouse(house)
            .then(
                house => {
                    dispatch(success(house));
                    history.push('/houses');
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
