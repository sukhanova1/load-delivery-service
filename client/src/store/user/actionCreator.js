import {
	CHANGE_PASS_REQUEST,
	DELETE_ACC_REQUEST,
	FORGOT_PASS_REQUEST,
	GET_USER_INFO_REQUEST,
	GET_USER_INFO_SUCCESS,
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

export const changePassRequest = (payload) => ({
	type: CHANGE_PASS_REQUEST,
	payload,
});

export const deleteAccRequest = (payload) => ({
	type: DELETE_ACC_REQUEST,
	payload,
});

export const getUserInfoRequest = (payload) => ({
	type: GET_USER_INFO_REQUEST,
	payload,
});

export const getUserInfoSuccess = (payload) => ({
	type: GET_USER_INFO_SUCCESS,
	payload,
});
