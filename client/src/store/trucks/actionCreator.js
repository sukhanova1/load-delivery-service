import {
	ADD_TRUCK_REQUEST,
	EDIT_TRUCK_REQUEST,
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

export const editTruckRequest = (payload) => ({
	type: EDIT_TRUCK_REQUEST,
	payload,
});
