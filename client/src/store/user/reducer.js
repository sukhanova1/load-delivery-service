import { LOGIN_SUCCESS } from './actionTypes';

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
		default:
			return state;
	}
}
