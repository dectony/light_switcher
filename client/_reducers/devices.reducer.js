import { deviceConstants } from '../_constants'

export function devices(state = {items:[]},action) {
    switch(action.type) {
        case deviceConstants.GET_DEVICE_REQUEST:
            return {...state, loading: true};
        case deviceConstants.GET_DEVICE_SUCCESS:
            if(state.items.find(i => i.deviceId === action.device.deviceId)){
                return {...state,
                        items: state.items.map((device) => device.deviceId === action.device.deviceId
                        ? action.device
                        : device)};
            }else{
                return {...state,
                    items: [...state.items, action.device]}
                }
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