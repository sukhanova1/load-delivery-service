import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import Error from '../../../../common/Error/Error';
import useInput from '../../../../hooks/useInput';
import { login } from '../../../../store/user/actionCreator';
import { selectUserisAuth } from '../../../../store/user/selectors';
import { selectModalError } from '../../../../store/app/selectors';
import {
	BUTTON_TEXT_LOGIN,
	BUTTON_TYPE_SUBMIT,
	FORGOT_PASS_ROUTE,
	INPUT_EMAIL,
	INPUT_EMAIL_PLACEHOLDER,
	INPUT_PASS,
	INPUT_PASS_PLACEHOLDER,
	REGISTER_ROUTE,
	TRUCKS_ROUTE,
} from '../../../../utils/constants';

import '../form.css';

const LoginForm = () => {
	const email = useInput('', { isEmpty: true, isEmail: true });
	const password = useInput('', { isEmpty: true, isPassword: true });

	const isAuth = useSelector(selectUserisAuth);
	const serverError = useSelector(selectModalError);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		const data = { email: email.value, password: password.value };
		dispatch(login(data));
	};

	useEffect(() => {
		if (isAuth) {
			navigate(TRUCKS_ROUTE);
		}
	}, [isAuth]);

	return (
		<form className='form__content' onSubmit={handleLogin}>
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
			{serverError && <Error text={serverError} />}
			<p>
				<Link to={FORGOT_PASS_ROUTE} className='form__link'>
					Forgot your password?
				</Link>
			</p>
			<Button
				disabled={!email.isValidField || !password.isValidField}
				type={BUTTON_TYPE_SUBMIT}
				text={BUTTON_TEXT_LOGIN}
				className='form__btn'
			/>
			<p>
				Don't have an account?
				<Link to={REGISTER_ROUTE} className='form__link'>
					Create account
				</Link>
			</p>
		</form>
	);
};

export default LoginForm;
