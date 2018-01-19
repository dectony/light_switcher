import { deviceConstants } from '../_constants'

export function rooms(state = {},action) {
    switch(action.type) {
        case deviceConstants.GET_DEVICE_REQUEST:
            return {loading: true};
        case deviceConstants.GET_DEVICE_SUCCESS:
            return {item: action.device};
        case deviceConstants.GET_DEVICE_FAILURE:
            return {error: action.error};
        case deviceConstants.GET_DEVICES_REQUEST:
            return {...state, loading: true };
        case deviceConstants.GET_DEVICES_SUCCESS:
            return {
                ...state, item:{ rooms: [...state.item.rooms, action.room]}
            };
        case deviceConstants.GET_DEVICES_FAILURE:
            return {};    
        default: return state;
    }
}