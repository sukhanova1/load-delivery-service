import {
	FORGOT_PASS_REQUEST,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	REGISTER_REQUEST,
} from './actionTypes';

export const login = (payload) => ({
	type: LOGIN_REQUEST,
	payload,
});

export const loginSuccess = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
});

export const register = (payload) => ({
	type: REGISTER_REQUEST,
	payload,
});

export const forgotPass = (payload) => ({
	type: FORGOT_PASS_REQUEST,
	payload,
});

export const logoutRequest = () => ({
	type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS,
});
