import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'common/Button/Button';
import Modal from 'common/Modal/Modal';
import ProfileModal from './components/ProfileModal/ProfileModal';
import { logoutRequest } from 'store/user/actionCreator';
import { selectUserInfo } from 'store/user/selectors';
import { transformDate } from 'helpers/transformDate';
import { selectModalError, selectModalSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import './ProfileInfo.css';

const ProfileInfo = () => {
	const [modal, setModal] = useState(false);
	const [changePassModal, setChangePassModal] = useState(false);
	const [deleteAccModal, setDeleteAccModal] = useState(false);

	const userInfo = useSelector(selectUserInfo);
	const serverSuccess = useSelector(selectModalSuccess);
	const serverError = useSelector(selectModalError);

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
			{serverSuccess && (
				<Modal type={constants.MODAL_TYPE_SUCCESS} text={serverSuccess} />
			)}
			{serverError && (
				<Modal type={constants.MODAL_TYPE_ERROR} text={serverError} />
			)}
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
