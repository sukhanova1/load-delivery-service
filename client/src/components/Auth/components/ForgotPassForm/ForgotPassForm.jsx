import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import Error from '../../../../common/Error/Error';
import useInput from '../../../../hooks/useInput';
import { forgotPass } from '../../../../store/user/actionCreator';
import constants from '../../../../utils/constants';

import '../form.css';

const ForgotPassForm = () => {
	const email = useInput('', { isEmpty: true, isEmail: true });

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { email: email.value };
		dispatch(forgotPass(data));
	};

	return (
		<form className='form__content' onSubmit={handleSubmit}>
			<p>New password will be sent to your email address</p>
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
			<Button
				disabled={!email.isValidField}
				type={constants.BUTTON_TYPE_SUBMIT}
				text={constants.BUTTON_TEXT_SEND}
				className='form__btn'
			/>
			<p>
				Click here to{' '}
				<Link to={constants.LOGIN_ROUTE} className='form__link'>
					login
				</Link>
			</p>
		</form>
	);
};

export default ForgotPassForm;
