import { homeConstants } from '../_constants';

export function creation(state = {}, action) {
    switch (action.type) {
        case homeConstants.CREATE_REQUEST:
            return { creating: true };
        case homeConstants.CREATE_FAILURE:
            return {};
        case homeConstants.CREATE_SUCCESS:
            return {};
        default:
            return state
    }
}