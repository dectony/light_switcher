import { houseConstants } from '../_constants';

export function houses(state = {}, action) {
    switch (action.type) {
        case houseConstants.CREATE_REQUEST:
            return { creating: true };
        case houseConstants.CREATE_FAILURE:
            return {};
        case houseConstants.CREATE_SUCCESS:
            return {};
        case houseConstants.GET_HOUSES_REQUEST:
            return { loading: true };
        case houseConstants.GET_HOUSES_SUCCESS:
            return {
                items: action.houses
            };
        case houseConstants.GET_HOUSES_FAILURE:
            return {};
        default:
            return state
    }
}