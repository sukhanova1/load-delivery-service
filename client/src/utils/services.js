import axios from 'axios';
import { BASE_URL } from './constants';

//user
export const loginRequest = async (data) => {
	const result = await axios.post(BASE_URL + '/auth/login', data);
	return result;
};

export const registerRequest = async (data) => {
	const result = await axios.post(BASE_URL + '/auth/register', data);
	return result;
};

export const forgotPassRequest = async (data) => {
	const result = await axios.post(BASE_URL + '/auth/forgot_password', data);
	return result;
};
