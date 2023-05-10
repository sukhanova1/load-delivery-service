import { call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_TRUCK_REQUEST,
	DELETE_TRUCK_REQUEST,
	EDIT_TRUCK_REQUEST,
	GET_TRUCKS_REQUEST,
} from './actionType';
import {
	addTruckRequest,
	deleteTruckRequest,
	editTruckRequest,
	getTrucksRequest,
} from '../../utils/services';
import { deleteTruckSucess, getAllTrucksSucess } from './actionCreator';
import { setModalError, setModalSuccess } from '../app/actionCreator';

function* getAllTrucks(action) {
	try {
		const { status, data } = yield call(getTrucksRequest, action.payload);
		if (status === 200) {
			yield put(getAllTrucksSucess(data.trucks));
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
		const { status, data } = yield call(editTruckRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess(data.message));
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

export function* truckWatcher() {
	yield takeLatest(GET_TRUCKS_REQUEST, getAllTrucks);
	yield takeLatest(ADD_TRUCK_REQUEST, addTruck);
	yield takeLatest(EDIT_TRUCK_REQUEST, editTruck);
	yield takeLatest(DELETE_TRUCK_REQUEST, deleteTruck);
}

export default function* rootTruckSaga() {
	yield truckWatcher();
}
