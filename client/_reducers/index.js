import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { houses } from './automatedHouse.reducer';
import { editHouse } from './house.edit.reducer';
import { rooms } from './room.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    houses,
    editHouse,
    rooms
});

export default rootReducer;