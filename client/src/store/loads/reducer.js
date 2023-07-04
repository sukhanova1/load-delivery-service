import {
	DELETE_LOAD_SUCCESS,
	GET_ACTIVE_LOADS_SUCCESS,
	GET_LOADS_SUCCESS,
	GET_SHIPP_INFO_SUCCESS,
} from './actionTypes';

const initState = { loads: [], shipp_info: null };

export default function loads(state = initState, action) {
	switch (action.type) {
		case GET_LOADS_SUCCESS:
			return {
				...state,
				loads: action.payload ? action.payload : initState.loads,
			};
		case DELETE_LOAD_SUCCESS:
			return {
				...state,
				loads: state.loads.filter((load) => load._id !== action.payload),
			};
		case GET_SHIPP_INFO_SUCCESS:
			return { ...state, shipp_info: action.payload };
		case GET_ACTIVE_LOADS_SUCCESS:
			return {
				...state,
				loads: action.payload ? action.payload : initState.loads,
			};
		default:
			return state;
	}
}
