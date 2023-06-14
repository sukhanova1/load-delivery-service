import {
	ADD_LOAD_REQUEST,
	GET_ACTIVE_LOADS_REQUEST,
	GET_ACTIVE_LOADS_SUCCESS,
	GET_LOADS_REQUEST,
	GET_LOADS_SUCCESS,
	ITERATE_TO_NEXT_STATE_REQUEST,
} from './actionTypes';

export const getLoadsRequest = (payload) => ({
	type: GET_LOADS_REQUEST,
	payload,
});

export const getLoadsSuccess = (payload) => ({
	type: GET_LOADS_SUCCESS,
	payload,
});

export const addLoadRequest = (payload) => ({
	type: ADD_LOAD_REQUEST,
	payload,
});

export const getActiveLoadsRequest = (payload) => ({
	type: GET_ACTIVE_LOADS_REQUEST,
	payload,
});

export const getActiveLoadsSuccess = (payload) => ({
	type: GET_ACTIVE_LOADS_SUCCESS,
	payload,
});

export const iterateToNextStateRequest = (payload) => ({
	type: ITERATE_TO_NEXT_STATE_REQUEST,
	payload,
});
