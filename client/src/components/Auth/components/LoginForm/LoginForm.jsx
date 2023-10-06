import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import Error from 'common/Error/Error';
import useInput from 'hooks/useInput';
import { login } from 'store/user/actionCreator';
import { selectUserisAuth } from 'store/user/selectors';
import { selectServerError } from 'store/app/selectors';
import constants from 'utils/constants';

import '../form.css';

const LoginForm = () => {
	const email = useInput('', { isEmpty: true, isEmail: true });
	const password = useInput('', { isEmpty: true, isPassword: true });

	const isAuth = useSelector(selectUserisAuth);
	const serverError = useSelector(selectServerError);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		const data = { email: email.value, password: password.value };
		dispatch(login(data));
	};

	useEffect(() => {
		if (isAuth) {
			navigate(constants.LOADS_ROUTE);
		}
	}, [isAuth]);

	return (
		<form className='form__content' onSubmit={handleLogin}>
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
			{serverError && <Error text={serverError} />}
			<p>
				<Link to={constants.FORGOT_PASS_ROUTE} className='form__link'>
					Forgot your password?
				</Link>
			</p>
			<Button
				disabled={!email.isValidField || !password.isValidField}
				type={constants.BUTTON_TYPE_SUBMIT}
				text={constants.BUTTON_TEXT_LOGIN}
				className='form__btn'
			/>
			<p>
				Don't have an account?
				<Link to={constants.REGISTER_ROUTE} className='form__link'>
					Create account
				</Link>
			</p>
		</form>
	);
};

export default LoginForm;
