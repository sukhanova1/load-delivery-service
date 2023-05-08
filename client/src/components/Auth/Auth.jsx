import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from '../../common/Logo/Logo';
import Modal from '../../common/Modal/Modal';
import {
	selectModalError,
	selectModalSuccess,
} from '../../store/app/selectors';

import './Auth.css';
import { MODAL_TYPE_ERROR, MODAL_TYPE_SUCCESS } from '../../utils/constants';

const Auth = () => {
	const modalSucess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	return (
		<div className='form'>
			<div className='form__container'>
				{modalSucess && <Modal type={MODAL_TYPE_SUCCESS} text={modalSucess} />}
				{modalError && <Modal type={MODAL_TYPE_ERROR} text={modalError} />}
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
