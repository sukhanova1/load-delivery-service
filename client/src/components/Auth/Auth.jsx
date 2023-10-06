import React from 'react';
import { Outlet } from 'react-router-dom';

import Logo from 'common/Logo/Logo';
import Notification from 'common/Notification/Notification';

import './Auth.css';

const Auth = () => (
	<div className='form'>
		<div className='form__container'>
			<Notification />
			<div className='form__header'>
				<Logo width='250px' />
				<h2 className='form__title'>Delivery Service</h2>
			</div>
			<Outlet />
		</div>
	</div>
);

export default Auth;
