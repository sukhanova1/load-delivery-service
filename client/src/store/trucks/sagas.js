import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_TRUCKS_REQUEST } from './actionType';
import { getTrucksRequest } from '../../utils/services';
import { getAllTrucksSucess } from './actionCreator';
import { setModalError } from '../app/actionCreator';

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

export function* truckWatcher() {
	yield takeEvery(GET_TRUCKS_REQUEST, getAllTrucks);
}

export default function* rootTruckSaga() {
	yield truckWatcher();
}
