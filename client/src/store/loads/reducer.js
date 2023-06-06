import { GET_ACTIVE_LOADS_SUCCESS } from './actionTypes';

const initState = [];

export default function loads(state = initState, action) {
	switch (action.type) {
		case GET_ACTIVE_LOADS_SUCCESS:
			return action.payload ? action.payload : initState;
		default:
			return state;
	}
}
