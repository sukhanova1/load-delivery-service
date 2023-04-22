import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { logoutRequest } from '../../../../store/user/actionCreator';
import {
	BUTTON_LOGOUT_TEXT,
	BUTTON_TEXT_CHANGE_PASS,
	BUTTON_TEXT_DELETE_ACC,
	BUTTON_TYPE_BUTTON,
	USER_PHOTO_ALT_VALUE,
	USER_PHOTO_SRC,
} from '../../../../utils/constants';

import './ProfileInfo.css';

const ProfileInfo = () => {
	const dispatch = useDispatch();

	const handleChangePassword = () => {
		console.log('password changed');
	};

	const handleDeleteAcc = () => {
		console.log('Acc deleted');
	};

	const handleLogout = () => dispatch(logoutRequest());

	return (
		<div className='profile'>
			<img
				src={USER_PHOTO_SRC}
				className='user-photo'
				alt={USER_PHOTO_ALT_VALUE}
				width='200px'
			/>
			<div className='profile__content'>
				<h3>{'User name'}</h3>
				<p>{'asd12345@gmail.com'}</p>
				<h4 className='profile__role'>Role: {'DRIVER'}</h4>
				<p className='profile__date'>Since {'22/03/2022'}</p>
			</div>
			<Button
				className='profile__btn'
				type={BUTTON_TYPE_BUTTON}
				text={BUTTON_TEXT_CHANGE_PASS}
				onClick={handleChangePassword}
			/>
			<Button
				className='profile__btn profile__btn-delete'
				type={BUTTON_TYPE_BUTTON}
				text={BUTTON_TEXT_DELETE_ACC}
				onClick={handleDeleteAcc}
			/>
			<Button
				className='profile__btn profile__btn-logout'
				type={BUTTON_TYPE_BUTTON}
				text={BUTTON_LOGOUT_TEXT}
				onClick={handleLogout}
			/>
		</div>
	);
};

export default ProfileInfo;
