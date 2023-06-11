import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_ACTIVE_LOADS_REQUEST,
	ITERATE_TO_NEXT_STATE_REQUEST,
} from './actionTypes';
import {
	getActiveLoadsRequest,
	iterateToNextStateRequest,
} from '../../utils/services';
import { setModalError } from '../app/actionCreator';
import { getActiveLoadsSuccess } from './actionCreator';

function* getActiveLoads(action) {
	try {
		const { status, data } = yield call(getActiveLoadsRequest, action.payload);
		if (status === 200) {
			yield put(getActiveLoadsSuccess(data.load));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* iterateToNextLoadState(action) {
	try {
		const { status } = yield call(iterateToNextStateRequest, action.payload);
		if (status === 200) {
			yield getActiveLoads(action);
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

export function* loadWatcher() {
	yield takeLatest(GET_ACTIVE_LOADS_REQUEST, getActiveLoads);
	yield takeLatest(ITERATE_TO_NEXT_STATE_REQUEST, iterateToNextLoadState);
}

export default function* rootLoadSaga() {
	yield loadWatcher();
}
