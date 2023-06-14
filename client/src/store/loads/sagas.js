import { takeLatest, call, put } from 'redux-saga/effects';

import {
	ADD_LOAD_REQUEST,
	GET_ACTIVE_LOADS_REQUEST,
	GET_LOADS_REQUEST,
	ITERATE_TO_NEXT_STATE_REQUEST,
	EDIT_LOAD_REQUEST,
	DELETE_LOAD_REQUEST,
} from './actionTypes';
import {
	addLoadRequest,
	deleteLoadRequest,
	editLoadRequest,
	getActiveLoadsRequest,
	getLoadsRequest,
	iterateToNextStateRequest,
} from '../../utils/services';
import { setModalError, setModalSuccess } from '../app/actionCreator';
import {
	deleteLoadSuccess,
	getActiveLoadsSuccess,
	getLoadsSuccess,
} from './actionCreator';

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

function* addLoad(action) {
	try {
		const { status, data } = yield call(addLoadRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess(data.message));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* editLoad(action) {
	try {
		const { status, data } = yield call(editLoadRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess(data.message));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* deleteLoad(action) {
	try {
		const { status } = yield call(deleteLoadRequest, action.payload);
		if (status === 200) {
			yield put(deleteLoadSuccess(action.payload.id));
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
	yield takeLatest(ADD_LOAD_REQUEST, addLoad);
	yield takeLatest(EDIT_LOAD_REQUEST, editLoad);
	yield takeLatest(DELETE_LOAD_REQUEST, deleteLoad);
	yield takeLatest(GET_ACTIVE_LOADS_REQUEST, getActiveLoads);
	yield takeLatest(ITERATE_TO_NEXT_STATE_REQUEST, iterateToNextLoadState);
}

export default function* rootLoadSaga() {
	yield loadWatcher();
}
