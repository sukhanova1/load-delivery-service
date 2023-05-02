import { call, put, takeLatest } from 'redux-saga/effects';

import {
	getUserInfoSuccess,
	loginSuccess,
	logoutSuccess,
} from './actionCreator';
import { setModalError, setModalSuccess } from '../app/actionCreator';
import {
	FORGOT_PASS_REQUEST,
	GET_USER_INFO_REQUEST,
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	REGISTER_REQUEST,
} from './actionTypes';
import {
	forgotPassRequest,
	getUserInfoRequest,
	loginRequest,
	registerRequest,
} from '../../utils/services';

function* login(action) {
	try {
		const { status, data } = yield call(loginRequest, action.payload);
		if (status === 200) {
			yield put(loginSuccess(data.jwt_token));
			yield put(setModalError(''));
			yield localStorage.setItem('token', data.jwt_token);
		}
	} catch (e) {
		const { message } = e.response.data;
		yield put(setModalError(message));
	}
}

function* register(action) {
	try {
		const { status, data } = yield call(registerRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess(data.message));
			yield put(setModalError(''));
		}
	} catch (e) {
		const { message } = e.response.data;
		if (message.startsWith('E11000 duplicate key')) {
			yield put(setModalError('User already exists'));
		}
	}
}

function* forgotPass(action) {
	try {
		const { status } = yield call(forgotPassRequest, action.payload);
		if (status === 200) {
			yield put(setModalSuccess('New password has been sent to your email'));
		}
	} catch (e) {
		const { message } = e.response.data;
		yield put(setModalError(message));
	}
}

function* logout(action) {
	yield localStorage.removeItem('token');
	yield put(logoutSuccess());
}

function* getUserInfo(action) {
	try {
		const { status, data } = yield call(getUserInfoRequest, action.payload);
		if (status === 200) {
			yield put(getUserInfoSuccess(data.user));
		}
	} catch (e) {}
}

export function* userWatcher() {
	yield takeLatest(LOGIN_REQUEST, login);
	yield takeLatest(REGISTER_REQUEST, register);
	yield takeLatest(FORGOT_PASS_REQUEST, forgotPass);
	yield takeLatest(LOGOUT_REQUEST, logout);
	yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}

export default function* rootUserSaga() {
	yield userWatcher();
}
