import React from 'react';
import { useDispatch } from 'react-redux';

import Input from 'common/Input/Input';
import Error from 'common/Error/Error';
import Button from 'common/Button/Button';
import useInput from 'hooks/useInput';
import { changePassRequest, deleteAccRequest } from 'store/user/actionCreator';
import constants from 'utils/constants';

import './ProfileModal.css';

const ProfileModal = ({
	changePassModal,
	deleteAccModal,
	handleCloseModal,
}) => {
	const oldPassword = useInput('', { isEmpty: true, isPassword: true });
	const newPassword = useInput('', { isEmpty: true, isPassword: true });

	const dispatch = useDispatch();

	const handleChangePass = (e) => {
		e.preventDefault();
		const payload = {
			token: localStorage.getItem('token'),
			data: { oldPassword: oldPassword.value, newPassword: newPassword.value },
		};
		dispatch(changePassRequest(payload));
		handleCloseModal();
	};

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
					<form className='profile-modal__form' onSubmit={handleChangePass}>
						<Input
							type={constants.INPUT_PASS}
							name={constants.INPUT_PASS}
							placeholder={constants.INPUT_PASS_PLACEHOLDER}
							value={oldPassword.value}
							onChange={oldPassword.onChange}
							onBlur={oldPassword.onBlur}
						/>
						{oldPassword.isDirty && oldPassword.isEmpty && (
							<Error text={oldPassword.isEmpty} />
						)}
						{oldPassword.isDirty &&
							oldPassword.value &&
							oldPassword.isPassword && <Error text={oldPassword.isPassword} />}
						<Input
							type={constants.INPUT_PASS}
							name={constants.INPUT_NEW_PASS}
							placeholder={constants.INPUT_NEW_PASS_PLACEHOLDER}
							value={newPassword.value}
							onChange={newPassword.onChange}
							onBlur={newPassword.onBlur}
						/>
						{newPassword.isDirty && newPassword.isEmpty && (
							<Error text={newPassword.isEmpty} />
						)}
						{newPassword.isDirty &&
							newPassword.value &&
							newPassword.isPassword && <Error text={newPassword.isPassword} />}
						<Button
							disabled={!oldPassword.isValidField || !newPassword.isValidField}
							type={constants.BUTTON_TYPE_SUBMIT}
							text={constants.BUTTON_TEXT_CHANGE}
							className='profile-modal__form-btn'
						/>
					</form>
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
