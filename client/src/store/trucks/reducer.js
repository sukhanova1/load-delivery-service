import { GET_TRUCKS_SUCCESS } from './actionType';

const initState = [];

export default function trucks(state = initState, action) {
	switch (action.type) {
		case GET_TRUCKS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}
