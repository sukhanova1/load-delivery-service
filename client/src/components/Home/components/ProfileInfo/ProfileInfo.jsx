import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from 'common/Notification/Notification';
import ProfileModal from './components/ProfileModal/ProfileModal';
import ProfileInfoButtons from './components/ProfileInfoButtons/ProfileInfoButtons';
import { logoutRequest } from 'store/user/actionCreator';
import { selectUserInfo } from 'store/user/selectors';
import { transformDate } from 'helpers/transformDate';
import { selectServerSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import './ProfileInfo.css';

const ProfileInfo = () => {
	const [modal, setModal] = useState(false);
	const [changePassModal, setChangePassModal] = useState(false);
	const [deleteAccModal, setDeleteAccModal] = useState(false);

	const userInfo = useSelector(selectUserInfo);
	const serverSuccess = useSelector(selectServerSuccess);

	const dispatch = useDispatch();

	const changePassword = () => {
		setModal(true);
		setChangePassModal(true);
	};

	const deleteAccount = () => {
		setModal(true);
		setDeleteAccModal(true);
	};

	const handleCloseModal = () => {
		setModal(false);
		setChangePassModal(false);
		setDeleteAccModal(false);
	};

	const handleLogout = () => dispatch(logoutRequest());

	useEffect(() => {
		if (serverSuccess && serverSuccess.includes('deleted successfully')) {
			handleLogout();
		}
	}, [serverSuccess]);

	return (
		<div className='profile'>
			<Notification />
			<img
				src={constants.USER_PHOTO_SRC}
				className='user-photo'
				alt={constants.USER_PHOTO_ALT_VALUE}
				width='200px'
			/>
			<div className='profile__content'>
				<h3>{userInfo.name}</h3>
				<p>{userInfo.email}</p>
				<h4 className='profile__role'>Role: {userInfo.role}</h4>
				<p className='profile__date'>
					Since {transformDate(userInfo.created_date)}
				</p>
			</div>
			<ProfileInfoButtons
				changePassword={changePassword}
				deleteAccount={deleteAccount}
				handleLogout={handleLogout}
			/>
			{modal && (
				<ProfileModal
					changePassModal={changePassModal}
					deleteAccModal={deleteAccModal}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default ProfileInfo;
