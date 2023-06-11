import {
	GET_ACTIVE_LOADS_REQUEST,
	GET_ACTIVE_LOADS_SUCCESS,
	ITERATE_TO_NEXT_STATE_REQUEST,
	ITERATE_TO_NEXT_STATE_SCCESS,
} from './actionTypes';

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
