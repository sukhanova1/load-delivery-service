import { GET_TRUCKS_REQUEST, GET_TRUCKS_SUCCESS } from './actionType';

export const getAllTrucksRequest = (payload) => ({
	type: GET_TRUCKS_REQUEST,
	payload,
});

export const getAllTrucksSucess = (payload) => ({
	type: GET_TRUCKS_SUCCESS,
	payload,
});
