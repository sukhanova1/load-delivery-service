import {
	DELETE_LOAD_SUCCESS,
	GET_ACTIVE_LOADS_SUCCESS,
	GET_LOADS_SUCCESS,
} from './actionTypes';

const initState = [];

export default function loads(state = initState, action) {
	switch (action.type) {
		case GET_LOADS_SUCCESS:
			return action.payload ? action.payload : initState;
		case DELETE_LOAD_SUCCESS:
			return state.filter((load) => load._id !== action.payload);
		case GET_ACTIVE_LOADS_SUCCESS:
			return action.payload ? action.payload : initState;
		default:
			return state;
	}
}
