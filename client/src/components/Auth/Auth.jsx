import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from '../../common/Logo/Logo';
import Modal from '../../common/Modal/Modal';
import { closeModal } from '../../store/app/actionCreator';
import { selectModalSuccess } from '../../store/app/selectors';

import './Auth.css';

const Auth = () => {
	const modalSucess = useSelector(selectModalSuccess);

	const dispatch = useDispatch();

	useEffect(() => {
		if (modalSucess) {
			setTimeout(() => {
				dispatch(closeModal());
			}, 3000);
		}
	}, [modalSucess]);

	return (
		<div className='form'>
			<div className='form__container'>
				{modalSucess && <Modal type='success' text={modalSucess} />}
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
