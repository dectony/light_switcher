import { houseConstants, roomConstants } from '../_constants'


export function editHouse(state = {},action) {
    switch(action.type) {
        case houseConstants.GET_HOUSE_REQUEST:
            return {loading: true};
        case houseConstants.GET_HOUSE_SUCCESS:
            return {item: action.house};
        case houseConstants.GET_HOUSE_FAILURE:
            return {error: action.error};

        case roomConstants.CREATE_REQUEST:
            return {...state, creating: true };
        case roomConstants.CREATE_FAILURE:
            return {};
        case roomConstants.CREATE_SUCCESS:
            return {
                ...state , item: {...state.item, rooms: [...state.item.rooms, action.room]}
            }
            //Object.assign(state, {item: Object.assign(state.item, {rooms: [...state.item.rooms, action.room]})})
            ;

        case roomConstants.GET_ROOMS_REQUEST:
            return {...state, loading: true };
        case houseConstants.GET_ROOMS_SUCCESS:
            return {
                ...state, item:{ rooms: [...state.item.rooms, action.room]}
            };
        case houseConstants.GET_ROOMS_FAILURE:
            return {};
        default: return state;
    }
}