import { deviceConstants } from '../_constants'

export function devices(state = {},action) {
    switch(action.type) {
        case deviceConstants.GET_DEVICE_REQUEST:
            return {...state, loading: true};
        case deviceConstants.GET_DEVICE_SUCCESS:
            return {...state, items: state.items.map((device) => device._id === action.device._id ? action.device : device)};
        case deviceConstants.GET_DEVICE_FAILURE:
            return {...state, error: action.error};

        case deviceConstants.GET_DEVICES_REQUEST:
            return {...state, loading: true };
        case deviceConstants.GET_DEVICES_SUCCESS:
            return {
                ...state, items: action.devices, loading: false
            };
        case deviceConstants.GET_DEVICES_FAILURE:
            return {};    
        default: return state;
    }
}