import {
	ADD_TRUCK_REQUEST,
	ADD_TRUCK_SUCCESS,
	GET_TRUCKS_REQUEST,
	GET_TRUCKS_SUCCESS,
} from './actionType';

export const getAllTrucksRequest = (payload) => ({
	type: GET_TRUCKS_REQUEST,
	payload,
});

export const getAllTrucksSucess = (payload) => ({
	type: GET_TRUCKS_SUCCESS,
	payload,
});

export const addTruckRequest = (payload) => ({
	type: ADD_TRUCK_REQUEST,
	payload,
});

export const addTruckSuccess = (payload) => ({
	type: ADD_TRUCK_SUCCESS,
	payload,
});
