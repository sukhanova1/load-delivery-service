import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'common/Button/Button';
import { deleteAccRequest } from 'store/user/actionCreator';
import constants from 'utils/constants';

import './DeleteAccountForm.css';

const DeleteAccountForm = ({ handleCloseModal }) => {
	const dispatch = useDispatch();

	const handleDeleteAcc = () => {
		dispatch(deleteAccRequest({ token: localStorage.getItem('token') }));
		handleCloseModal();
	};

	return (
		<div className='delete-account-form'>
			<p>
				Are you sure you want to delete your account? This will permanently
				erase your account and delete all of your data and information.
			</p>
			<div>
				<Button
					type={constants.BUTTON_TYPE_BUTTON}
					text={constants.BUTTON_TEXT_CANCEL}
					onClick={handleCloseModal}
					className='delete-account__btn-cancel delete-account__btn'
				/>
				<Button
					type={constants.BUTTON_TYPE_BUTTON}
					text={constants.BUTTON_TEXT_DELETE}
					onClick={handleDeleteAcc}
					className='delete-account__btn-delete delete-account__btn'
				/>
			</div>
		</div>
	);
};

export default DeleteAccountForm;
