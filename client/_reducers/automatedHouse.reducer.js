import { houseConstants } from '../_constants';

export function houses(state = {creating:false, items:[]}, action) {
    switch (action.type) {
        case houseConstants.CREATE_REQUEST:
            return {...state, creating: true };
        case houseConstants.CREATE_FAILURE:
            return {};
        case houseConstants.CREATE_SUCCESS:
            return {
                items: [...state.items, action.house]
            };

        case houseConstants.GET_HOUSES_REQUEST:
            return {...state, loading: true };
        case houseConstants.GET_HOUSES_SUCCESS:
            return {
                ...state, items: action.houses
            };
        case houseConstants.GET_HOUSES_FAILURE:
            return {};


        case houseConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(house =>
                    house._id === action.id
                        ? { ...house, deleting: true }
                        : house
                )
            };
        case houseConstants.DELETE_SUCCESS:
            return {
                ...state, items: state.items.filter(house => house._id !== action.id)
            };
        case houseConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(house => {
                    if (house._id === house.id) {
                        const { deleting, ...houseCopy } = house;
                        return { ...houseCopy, deleteError: action.error };
                    }

                    return house;
                })
            };
        default:
            return state
    }
}