import { roomConstants } from '../_constants'

export function rooms(state = {},action) {
    switch(action.type) {
        case roomConstants.GET_ROOM_REQUEST:
            return {loading: true};
        case roomConstants.GET_ROOM_SUCCESS:
            return {item: action.house};
        case roomConstants.GET_ROOM_FAILURE:
            return {error: action.error};
        default: return state;
    }
}