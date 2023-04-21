import { CLOSE_MODAL, SET_MODAL_ERROR, SET_MODAL_SUCCESS } from './actionTypes';

const initState = {
	serverError: '',
	serverSucces: '',
};

export default function app(state = initState, action) {
	switch (action.type) {
		case CLOSE_MODAL:
			return initState;
		case SET_MODAL_SUCCESS:
			return { ...state, serverSucces: action.payload };
		case SET_MODAL_ERROR:
			return { ...state, serverError: action.payload };
		default:
			return state;
	}
}
