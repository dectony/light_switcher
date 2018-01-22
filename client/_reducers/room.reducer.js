import { roomConstants, deviceConstants } from '../_constants'

export function rooms(state = {},action) {
    switch(action.type) {
        case roomConstants.GET_ROOM_REQUEST:
            return {loading: true};
        case roomConstants.GET_ROOM_SUCCESS:
            return {item: action.house};
        case roomConstants.GET_ROOM_FAILURE:
            return {error: action.error};

        case roomConstants.GET_ROOMS_REQUEST:
            return {...state, loading: true };
        case roomConstants.GET_ROOMS_SUCCESS:
            return {
                ...state, items: action.rooms
            };
        case roomConstants.GET_ROOMS_FAILURE:
            return {};

        // case deviceConstants.GET_DEVICE_REQUEST:
        //     return {...state};
        // case deviceConstants.GET_DEVICE_SUCCESS:
        //     return {...state, items: state.items.map((room) => room._id === action.device.room
        //         ? {...room, devices: room.devices.map((device) => device._id === action.device._id
        //             ? action.device
        //             : device)}
        //         : room)};
        // case deviceConstants.GET_DEVICE_FAILURE:
        //     return {error: action.error};
        default: return state;
    }
}