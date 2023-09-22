import React from 'react';
import { useDispatch } from 'react-redux';

import Input from 'common/Input/Input';
import Error from 'common/Error/Error';
import Button from 'common/Button/Button';
import useInput from 'hooks/useInput';
import { changePassRequest } from 'store/user/actionCreator';
import constants from 'utils/constants';

import './ChangePassForm.css';

const ChangePassForm = ({ handleCloseModal }) => {
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

	return (
		<form className='change-pass__form' onSubmit={handleChangePass}>
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
			{oldPassword.isDirty && oldPassword.value && oldPassword.isPassword && (
				<Error text={oldPassword.isPassword} />
			)}
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
			{newPassword.isDirty && newPassword.value && newPassword.isPassword && (
				<Error text={newPassword.isPassword} />
			)}
			<Button
				disabled={!oldPassword.isValidField || !newPassword.isValidField}
				type={constants.BUTTON_TYPE_SUBMIT}
				text={constants.BUTTON_TEXT_CHANGE}
				className='change-pass__form-btn'
			/>
		</form>
	);
};

export default ChangePassForm;
