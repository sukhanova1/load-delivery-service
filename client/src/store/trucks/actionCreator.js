import {
	ADD_TRUCK_REQUEST,
	ASSIGN_TRUCK_REQUEST,
	ASSIGN_TRUCK_SUCCESS,
	DELETE_TRUCK_REQUEST,
	DELETE_TRUCK_SUCCESS,
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

export const deleteTruckRequest = (payload) => ({
	type: DELETE_TRUCK_REQUEST,
	payload,
});

export const deleteTruckSucess = (payload) => ({
	type: DELETE_TRUCK_SUCCESS,
	payload,
});

export const assignTruckRequest = (payload) => ({
	type: ASSIGN_TRUCK_REQUEST,
	payload,
});

export const assignTruckSucess = (payload) => ({
	type: ASSIGN_TRUCK_SUCCESS,
	payload,
});
