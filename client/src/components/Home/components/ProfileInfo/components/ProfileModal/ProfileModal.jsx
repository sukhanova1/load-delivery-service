import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'common/Button/Button';
import { deleteAccRequest } from 'store/user/actionCreator';
import constants from 'utils/constants';

import './ProfileModal.css';
import ChangePassForm from '../ChangePassForm/ChangePassForm';

const ProfileModal = ({
	changePassModal,
	deleteAccModal,
	handleCloseModal,
}) => {
	const dispatch = useDispatch();

	const handleDeleteAcc = () => {
		dispatch(deleteAccRequest({ token: localStorage.getItem('token') }));
		handleCloseModal();
	};

	return (
		<div className='profile-modal'>
			<div className='profile-modal__box'>
				<img
					src={constants.CLOSE_ICON_SRC}
					alt={constants.CLOSE_ICON_ALT_VALUE}
					className='profile-modal__closemark'
					onClick={handleCloseModal}
				/>
				{changePassModal && (
					<ChangePassForm handleCloseModal={handleCloseModal} />
				)}
				{deleteAccModal && (
					<div className='profile-modal__delete'>
						<p>
							Are you sure you want to delete your account? This will
							permanently erase your account and delete all of your data and
							information.
						</p>
						<div>
							<Button
								type={constants.BUTTON_TYPE_BUTTON}
								text={constants.BUTTON_TEXT_CANCEL}
								onClick={handleCloseModal}
								className='profile-modal__btn-cancel profile-modal__btn'
							/>
							<Button
								type={constants.BUTTON_TYPE_BUTTON}
								text={constants.BUTTON_TEXT_DELETE}
								onClick={handleDeleteAcc}
								className='profile-modal__btn-delete profile-modal__btn'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileModal;
