import React from 'react';

import ChangePassForm from '../ChangePassForm/ChangePassForm';
import DeleteAccountForm from '../DeleteAccountForm/DeleteAccountForm';
import constants from 'utils/constants';

import './ProfileModal.css';

const ProfileModal = ({
	changePassModal,
	deleteAccModal,
	handleCloseModal,
}) => (
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
				<DeleteAccountForm handleCloseModal={handleCloseModal} />
			)}
		</div>
	</div>
);

export default ProfileModal;
