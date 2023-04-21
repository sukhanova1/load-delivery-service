import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../../../common/Input/Input';
import Error from '../../../../common/Error/Error';
import Button from '../../../../common/Button/Button';
import useInput from '../../../../hooks/useInput';
import { register } from '../../../../store/user/actionCreator';
import {
	selectModalError,
	selectModalSuccess,
} from '../../../../store/app/selectors';
import {
	BUTTON_TEXT_SIGNUP,
	BUTTON_TYPE_SUBMIT,
	DRIVER_ROLE,
	INPUT_CONFIRM_PASS,
	INPUT_CONFIRM_PASS_PLACEHOLDER,
	INPUT_EMAIL,
	INPUT_EMAIL_PLACEHOLDER,
	INPUT_NAME,
	INPUT_NAME_PLACEHOLDER,
	INPUT_PASS,
	INPUT_PASS_PLACEHOLDER,
	INPUT_RADIO,
	INPUT_RADIO_NAME,
	LOGIN_ROUTE,
	SHIPPER_ROLE,
} from '../../../../utils/constants';

import '../form.css';

const RegisterForm = () => {
	const name = useInput('', {
		fieldName: 'Name',
		isEmpty: true,
		minLength: 2,
		maxLength: 13,
	});
	const email = useInput('', { isEmpty: true, isEmail: true });
	const role = useInput(DRIVER_ROLE);
	const password = useInput('', { isEmpty: true, isPassword: true });
	const confirmPassword = useInput('', { isEmpty: true });

	const serverError = useSelector(selectModalError);
	const serverSuccess = useSelector(selectModalSuccess);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();
		const data = {
			name: name.value,
			email: email.value,
			role: name.value,
			password: password.value,
		};
		dispatch(register(data));
	};

	useEffect(() => {
		if (serverSuccess) {
			navigate(LOGIN_ROUTE);
		}
	}, [serverSuccess]);

	return (
		<form className='form__content' onSubmit={handleRegister}>
			<Input
				type={INPUT_NAME}
				name={INPUT_NAME}
				placeholder={INPUT_NAME_PLACEHOLDER}
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
				type={INPUT_EMAIL}
				name={INPUT_EMAIL}
				placeholder={INPUT_EMAIL_PLACEHOLDER}
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
					type={INPUT_RADIO}
					id={DRIVER_ROLE}
					name={INPUT_RADIO_NAME}
					value={DRIVER_ROLE}
					checked={role.value === DRIVER_ROLE}
					onChange={role.onChange}
				/>
				<Input
					type={INPUT_RADIO}
					id={SHIPPER_ROLE}
					name={INPUT_RADIO_NAME}
					value={SHIPPER_ROLE}
					checked={role.value === SHIPPER_ROLE}
					onChange={role.onChange}
				/>
			</div>
			<Input
				type={INPUT_PASS}
				name={INPUT_PASS}
				placeholder={INPUT_PASS_PLACEHOLDER}
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
				type={INPUT_PASS}
				name={INPUT_CONFIRM_PASS}
				placeholder={INPUT_CONFIRM_PASS_PLACEHOLDER}
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
				type={BUTTON_TYPE_SUBMIT}
				text={BUTTON_TEXT_SIGNUP}
				className='form__btn'
			/>
			<p>
				Already have an account?
				<Link to={LOGIN_ROUTE} className='form__link'>
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
