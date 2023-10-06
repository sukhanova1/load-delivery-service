import React from 'react';

import Button from 'common/Button/Button';
import constants from 'utils/constants';

import './ProfileInfoButtons.css';

const ProfileInfoButtons = ({
	changePassword,
	deleteAccount,
	handleLogout,
}) => (
	<>
		<Button
			className='profile__btn'
			type={constants.BUTTON_TYPE_BUTTON}
			text={constants.BUTTON_TEXT_CHANGE_PASS}
			onClick={changePassword}
		/>
		<Button
			className='profile__btn profile__btn-delete'
			type={constants.BUTTON_TYPE_BUTTON}
			text={constants.BUTTON_TEXT_DELETE_ACC}
			onClick={deleteAccount}
		/>
		<Button
			className='profile__btn profile__btn-logout'
			type={constants.BUTTON_TYPE_BUTTON}
			text={constants.BUTTON_TEXT_LOGOUT}
			onClick={handleLogout}
		/>
	</>
);

export default ProfileInfoButtons;
