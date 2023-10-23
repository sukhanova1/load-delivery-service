import { call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_TRUCK_REQUEST,
	ASSIGN_TRUCK_REQUEST,
	DELETE_TRUCK_REQUEST,
	EDIT_TRUCK_REQUEST,
	GET_TRUCKS_REQUEST,
} from './actionType';
import {
	addTruckRequest,
	assignTruckRequest,
	deleteTruckRequest,
	editTruckRequest,
	getTrucksRequest,
} from '../../utils/services';
import {
	assignTruckSucess,
	deleteTruckSucess,
	editTruckSucess,
	getAllTrucksSuccess,
} from './actionCreator';
import { setModalError, setModalSuccess } from '../app/actionCreator';

function* getAllTrucks(action) {
	try {
		const { status, data } = yield call(getTrucksRequest, action.payload);
		if (status === 200) {
			yield put(getAllTrucksSuccess(data.trucks));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* addTruck(action) {
	try {
		const { status, data } = yield call(addTruckRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess(data.message));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* editTruck(action) {
	try {
		const { status } = yield call(editTruckRequest, action.payload);
		if (status === 200) {
			yield put(editTruckSucess(action.payload));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* deleteTruck(action) {
	const payload = action.payload;
	try {
		const { status, data } = yield call(deleteTruckRequest, payload);
		if (status === 200) {
			yield put(deleteTruckSucess(payload.id));
			yield put(setModalSuccess(data.message));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

function* assignTruck(action) {
	const payload = action.payload;
	try {
		const { status } = yield call(assignTruckRequest, payload);
		if (status === 200) {
			yield put(assignTruckSucess(payload.id));
		}
	} catch (e) {
		yield put(setModalError(e.message));
	}
}

export function* truckWatcher() {
	yield takeLatest(GET_TRUCKS_REQUEST, getAllTrucks);
	yield takeLatest(ADD_TRUCK_REQUEST, addTruck);
	yield takeLatest(EDIT_TRUCK_REQUEST, editTruck);
	yield takeLatest(DELETE_TRUCK_REQUEST, deleteTruck);
	yield takeLatest(ASSIGN_TRUCK_REQUEST, assignTruck);
}

export default function* rootTruckSaga() {
	yield truckWatcher();
}
