import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Input from 'common/Input/Input';
import Error from 'common/Error/Error';
import Button from 'common/Button/Button';
import useInput from 'hooks/useInput';
import { register } from 'store/user/actionCreator';
import { selectServerError, selectServerSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import '../form.css';

const RegisterForm = () => {
	const name = useInput('', {
		fieldName: 'Name',
		isEmpty: true,
		minLength: 2,
		maxLength: 13,
	});
	const email = useInput('', { isEmpty: true, isEmail: true });
	const role = useInput(constants.DRIVER_ROLE);
	const password = useInput('', { isEmpty: true, isPassword: true });
	const confirmPassword = useInput('', { isEmpty: true });

	const serverError = useSelector(selectServerError);
	const serverSuccess = useSelector(selectServerSuccess);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();
		const data = {
			name: name.value,
			email: email.value,
			role: role.value,
			password: password.value,
		};
		dispatch(register(data));
	};

	useEffect(() => {
		if (serverSuccess) {
			navigate(constants.LOGIN_ROUTE);
		}
	}, [serverSuccess]);

	return (
		<form className='form__content' onSubmit={handleRegister}>
			<Input
				type={constants.INPUT_TEXT}
				name={constants.INPUT_NAME}
				placeholder={constants.INPUT_NAME_PLACEHOLDER}
				value={name.value}
				onChange={name.onChange}
				onBlur={name.onBlur}
			/>
			{name.isDirty && name.isEmpty && <Error text={name.isEmpty} />}
			{name.isDirty && name.value && name.minLength && (
				<Error text={name.minLength} />
			)}
			{name.isDirty && name.value && name.maxLength && (
				<Error text={name.maxLength} />
			)}
			<Input
				type={constants.INPUT_EMAIL}
				name={constants.INPUT_EMAIL}
				placeholder={constants.INPUT_EMAIL_PLACEHOLDER}
				value={email.value}
				onChange={email.onChange}
				onBlur={email.onBlur}
			/>
			{email.isDirty && email.isEmpty && <Error text={email.isEmpty} />}
			{email.isDirty && email.value && email.isEmail && (
				<Error text={email.isEmail} />
			)}
			<p>Choose your role:</p>
			<div>
				<Input
					type={constants.INPUT_RADIO}
					id={constants.DRIVER_ROLE}
					name={constants.INPUT_RADIO_NAME}
					value={constants.DRIVER_ROLE}
					checked={role.value === constants.DRIVER_ROLE}
					onChange={role.onChange}
				/>
				<Input
					type={constants.INPUT_RADIO}
					id={constants.SHIPPER_ROLE}
					name={constants.INPUT_RADIO_NAME}
					value={constants.SHIPPER_ROLE}
					checked={role.value === constants.SHIPPER_ROLE}
					onChange={role.onChange}
				/>
			</div>
			<Input
				type={constants.INPUT_PASS}
				name={constants.INPUT_PASS}
				placeholder={constants.INPUT_PASS_PLACEHOLDER}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
			/>
			{password.isDirty && password.isEmpty && (
				<Error text={password.isEmpty} />
			)}
			{password.isDirty && password.value && password.isPassword && (
				<Error text={password.isPassword} />
			)}
			<Input
				type={constants.INPUT_PASS}
				name={constants.INPUT_CONFIRM_PASS}
				placeholder={constants.INPUT_CONFIRM_PASS_PLACEHOLDER}
				value={confirmPassword.value}
				onChange={confirmPassword.onChange}
				onBlur={confirmPassword.onBlur}
			/>
			{confirmPassword.isDirty && confirmPassword.isEmpty && (
				<Error text={confirmPassword.isEmpty} />
			)}
			{confirmPassword.isDirty && password.value !== confirmPassword.value && (
				<Error text='Passwords do not match' />
			)}
			{serverError && <Error text={serverError} />}
			<Button
				disabled={
					!email.isValidField ||
					!password.isValidField ||
					password.value !== confirmPassword.value
				}
				type={constants.BUTTON_TYPE_SUBMIT}
				text={constants.BUTTON_TEXT_SIGNUP}
				className='form__btn'
			/>
			<p>
				Already have an account?
				<Link to={constants.LOGIN_ROUTE} className='form__link'>
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
