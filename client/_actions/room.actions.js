import { roomConstants } from '../_constants';
import { alertActions } from './';
import { houseService } from '../_services';

export const roomsActions = {
    addRoom,
    getRooms,
    getRoom,
    delete: _delete
};

function addRoom(room) {
    return dispatch => {
        dispatch(request({ room }));

        houseService.addRoom(room)
            .then(
                room => {
                    dispatch(success(room.room));
                    //history.push('/houses');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }

    function request(room) { return { type: roomConstants.CREATE_REQUEST, room } }
    function success(room) { return { type: roomConstants.CREATE_SUCCESS, room } }
    function failure(error) { return { type: roomConstants.CREATE_FAILURE, error } }
}

function getRooms(houseId) {
    return dispatch => {
        dispatch(request());

        houseService.getRooms(houseId)
            .then(
                rooms => dispatch(success(rooms)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: roomConstants.GET_ROOMS_REQUEST } }
    function success(rooms) { return { type: roomConstants.GET_ROOMS_SUCCESS, rooms } }
    function failure(error) { return { type: roomConstants.GET_ROOMS_FAILURE, error } }
}

function getRoom(roomId) {
    return dispatch => {
        dispatch(request());

        houseService.getRoomById(roomId)
            .then(
                room => dispatch(success(room)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: roomConstants.GET_ROOM_REQUEST } }
    function success(room) { return { type: roomConstants.GET_ROOM_SUCCESS, room } }
    function failure(error) { return { type: roomConstants.GET_ROOM_FAILURE, error } }
}

function _delete(roomId) {
    return dispatch => {
        dispatch(request({ roomId }));

        houseService._delete(roomId)
            .then(
                room => {
                    dispatch(success(roomId));
                },
                error => {
                    dispatch(failure(error, roomId));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: roomConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: roomConstants.DELETE_SUCCESS, id } }
    function failure(error, id) { return { type: roomConstants.DELETE_FAILURE, error, id } }
}
