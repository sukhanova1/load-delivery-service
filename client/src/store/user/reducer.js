import {
	GET_USER_INFO_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
} from './actionTypes';

const initState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	created_date: '',
};

export default function user(state = initState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, isAuth: true, token: action.payload };
		case LOGOUT_SUCCESS:
			return initState;
		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				role: action.payload.role,
				created_date: action.payload.created_date,
			};
		default:
			return state;
	}
}
