import { eventChannel } from 'redux-saga';
import {userConstants, deviceConstants} from '../_constants'
import { config, authHeader } from '../_helpers';
import { call, put, take, takeEvery } from 'redux-saga/effects';

function initWebsocket(user) {
    return eventChannel(emitter => {
        const ws = new WebSocket('ws://127.0.0.1:3030/?type=client&user='+user._id);
        ws.onopen = () => {
            console.log('opening...');
            let dataToSend = {
                type: 'client',
                user: user
            };
            ws.send(JSON.stringify(user));
        };
        ws.onerror = (error) => {
            console.log('WebSocket error ' + error);
        };
        ws.onmessage = (e) => {
            let device = null;
            try {
                if(e.data){
                    device = JSON.parse(e.data)
                }
            } catch(e) {
                console.log('Error parsing'  + e.data)
            }
            if (device) {
                return emitter({ type: deviceConstants.GET_DEVICE_SUCCESS, device });
            }
        };
        // unsubscribe function
        return () => {
            console.log('Socket off')
        }
    })
}

function* updateDevice(action) {
    console.log(action.device);
}

export default function* wsSagas() {
    yield takeEvery(deviceConstants.UPDATE_DEVICE, updateDevice);
    const {user} = yield take(userConstants.LOGIN_SUCCESS);
    const channel = yield call(initWebsocket, user);
    while (true) {
        const action = yield take(channel);
        yield put(action)
    }
}