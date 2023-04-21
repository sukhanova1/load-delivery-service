import { CLOSE_MODAL, SET_MODAL_SUCCESS, SET_MODAL_ERROR } from './actionTypes';

export const closeModal = () => ({
	type: CLOSE_MODAL,
});

export const setModalSuccess = (payload) => ({
	type: SET_MODAL_SUCCESS,
	payload,
});

export const setModalError = (payload) => ({
	type: SET_MODAL_ERROR,
	payload,
});
