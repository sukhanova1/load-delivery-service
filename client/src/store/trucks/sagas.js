import { call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_TRUCK_REQUEST,
	EDIT_TRUCK_REQUEST,
	GET_TRUCKS_REQUEST,
} from './actionType';
import {
	addTruckRequest,
	editTruckRequest,
	getTrucksRequest,
} from '../../utils/services';
import { getAllTrucksSucess } from './actionCreator';
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

export function* truckWatcher() {
	yield takeLatest(GET_TRUCKS_REQUEST, getAllTrucks);
	yield takeLatest(ADD_TRUCK_REQUEST, addTruck);
	yield takeLatest(EDIT_TRUCK_REQUEST, editTruck);
}

export default function* rootTruckSaga() {
	yield truckWatcher();
}
