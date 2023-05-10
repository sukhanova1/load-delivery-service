import {
	DELETE_TRUCK_SUCCESS,
	GET_TRUCKS_SUCCESS,
	ASSIGN_TRUCK_SUCCESS,
	EDIT_TRUCK_SUCCESS,
} from './actionType';

const initState = [];

export default function trucks(state = initState, action) {
	switch (action.type) {
		case GET_TRUCKS_SUCCESS:
			return action.payload;
		case EDIT_TRUCK_SUCCESS:
			return state.map((truck) =>
				truck._id === action.payload.id
					? { ...truck, type: action.payload.type }
					: truck
			);
		case DELETE_TRUCK_SUCCESS:
			return state.filter((truck) => truck._id !== action.payload);
		case ASSIGN_TRUCK_SUCCESS:
			return state.map((truck) =>
				truck._id === action.payload
					? { ...truck, assigned_to: action.payload }
					: truck
			);
		default:
			return state;
	}
}
