import axios from 'axios';
import { BASE_URL } from './constants';

//auth
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

//user
export const getUserInfoRequest = async (token) => {
	const headers = { Authorization: `Bearer ${token}` };
	const result = await axios.get(BASE_URL + '/users/me', { headers });
	return result;
};

//trucks
export const getTrucksRequest = async (token) => {
	const headers = { Authorization: `Bearer ${token}` };
	const result = await axios.get(BASE_URL + '/trucks', { headers });
	return result;
};
