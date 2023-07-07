import React from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../../../../common/Input/Input';
import Error from '../../../../../common/Error/Error';
import Button from '../../../../../common/Button/Button';
import useInput from '../../../../../hooks/useInput';
import {
	changePassRequest,
	deleteAccRequest,
} from '../../../../../store/user/actionCreator';
import {
	INPUT_PASS,
	INPUT_PASS_PLACEHOLDER,
	INPUT_NEW_PASS,
	INPUT_NEW_PASS_PLACEHOLDER,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TEXT_CHANGE,
	CLOSE_ICON_SRC,
	CLOSE_ICON_ALT_VALUE,
	BUTTON_TYPE_BUTTON,
	BUTTON_TEXT_CANCEL,
	BUTTON_TEXT_DELETE,
} from '../../../../../utils/constants';

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
					src={CLOSE_ICON_SRC}
					alt={CLOSE_ICON_ALT_VALUE}
					className='profile-modal__closemark'
					onClick={handleCloseModal}
				/>
				{changePassModal && (
					<form className='profile-modal__form' onSubmit={handleChangePass}>
						<Input
							type={INPUT_PASS}
							name={INPUT_PASS}
							placeholder={INPUT_PASS_PLACEHOLDER}
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
							type={INPUT_PASS}
							name={INPUT_NEW_PASS}
							placeholder={INPUT_NEW_PASS_PLACEHOLDER}
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
							type={BUTTON_TYPE_SUBMIT}
							text={BUTTON_TEXT_CHANGE}
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
								type={BUTTON_TYPE_BUTTON}
								text={BUTTON_TEXT_CANCEL}
								onClick={handleCloseModal}
								className='profile-modal__btn-cancel profile-modal__btn'
							/>
							<Button
								type={BUTTON_TYPE_BUTTON}
								text={BUTTON_TEXT_DELETE}
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
