import 'regenerator-runtime/runtime'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import wsSagas from '../sagas/sagas'
import { helloSaga } from '../sagas';

const loggerMiddleware = createLogger();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        sagaMiddleware
    )
);

// then run the saga
sagaMiddleware.run(wsSagas);
//sagaMiddleware.run(helloSaga);