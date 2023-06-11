import { takeLatest, call, put } from 'redux-saga/effects';

import {
	GET_ACTIVE_LOADS_REQUEST,
	GET_LOADS_REQUEST,
	ITERATE_TO_NEXT_STATE_REQUEST,
} from './actionTypes';
import {
	getActiveLoadsRequest,
	getLoadsRequest,
	iterateToNextStateRequest,
} from '../../utils/services';
import { setModalError } from '../app/actionCreator';
import { getActiveLoadsSuccess, getLoadsSuccess } from './actionCreator';

function* getLoads(action) {
	try {
		const { status, data } = yield call(getLoadsRequest, action.payload);
		if (status === 200) {
			yield put(getLoadsSuccess(data.loads));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

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
			yield call(getActiveLoads, action);
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

export function* loadWatcher() {
	yield takeLatest(GET_LOADS_REQUEST, getLoads);
	yield takeLatest(GET_ACTIVE_LOADS_REQUEST, getActiveLoads);
	yield takeLatest(ITERATE_TO_NEXT_STATE_REQUEST, iterateToNextLoadState);
}

export default function* rootLoadSaga() {
	yield loadWatcher();
}
