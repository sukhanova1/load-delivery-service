import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from 'common/Logo/Logo';
import Modal from 'common/Modal/Modal';
import { selectModalError, selectModalSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import './Auth.css';

const Auth = () => {
	const modalSuccess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	return (
		<div className='form'>
			<div className='form__container'>
				{modalSuccess && (
					<Modal type={constants.MODAL_TYPE_SUCCESS} text={modalSuccess} />
				)}
				{modalError && (
					<Modal type={constants.MODAL_TYPE_ERROR} text={modalError} />
				)}
				<div className='form__header'>
					<Logo width='250px' />
					<h2 className='form__title'>Delivery Service</h2>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Auth;
