import { houseConstants } from '../_constants'

export function editHouse(state = {},action) {
    switch(action.type) {
        case houseConstants.GET_HOUSE_REQUEST:
            return {loading: true};
        case houseConstants.GET_HOUSE_SUCCESS:
            return {item: action.house};
        case houseConstants.GET_HOUSE_FAILURE:
            return {error: action.error};
        default: return state;
    }
}