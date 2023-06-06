import {
	GET_ACTIVE_LOADS_REQUEST,
	GET_ACTIVE_LOADS_SUCCESS,
} from './actionTypes';

export const getActiveLoadsRequest = (payload) => ({
	type: GET_ACTIVE_LOADS_REQUEST,
	payload,
});

export const getActiveLoadsSuccess = (payload) => ({
	type: GET_ACTIVE_LOADS_SUCCESS,
	payload,
});
