import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { transformPathName } from '../../../../helpers/transformPathName';
import { selectUserName } from '../../../../store/user/selectors';
import {
	LOGOUT_ALT_VALUE,
	LOGOUT_SRC,
	PROFILE_ROUTE,
	TITLE_LOGOUT,
	TITLE_PROFILE,
	USER_PHOTO_ALT_VALUE,
	USER_PHOTO_SRC,
} from '../../../../utils/constants';

import './Header.css';

const Header = ({ toggle, handleLogout }) => {
	const { pathname } = useLocation();

	const userName = useSelector(selectUserName);

	return (
		<header className={toggle ? 'header' : 'header header-large'}>
			<h2 className='header__title'>{transformPathName(pathname)}</h2>
			<div className='header__user-info'>
				<Link to={PROFILE_ROUTE} className='header__link' title={TITLE_PROFILE}>
					{userName}
					<img src={USER_PHOTO_SRC} alt={USER_PHOTO_ALT_VALUE} width='45px' />
				</Link>
				<div title={TITLE_LOGOUT} onClick={handleLogout}>
					<img
						src={LOGOUT_SRC}
						className='header__icon'
						alt={LOGOUT_ALT_VALUE}
						width='40px'
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
