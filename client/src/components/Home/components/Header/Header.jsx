import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { transformPathName } from 'helpers/transformPathName';
import { selectUserName } from 'store/user/selectors';
import constants from 'utils/constants';

import './Header.css';

const Header = ({ toggle, handleLogout }) => {
	const { pathname } = useLocation();

	const userName = useSelector(selectUserName);

	return (
		<header className={toggle ? 'header' : 'header header-large'}>
			<h2 className='header__title'>{transformPathName(pathname)}</h2>
			<div className='header__user-info'>
				<Link
					to={constants.PROFILE_ROUTE}
					className='header__link'
					title={constants.TITLE_PROFILE}
				>
					{userName}
					<img
						src={constants.USER_PHOTO_SRC}
						alt={constants.USER_PHOTO_ALT_VALUE}
						width='45px'
					/>
				</Link>
				<div title={constants.TITLE_LOGOUT} onClick={handleLogout}>
					<img
						src={constants.LOGOUT_SRC}
						className='header__icon'
						alt={constants.LOGOUT_ALT_VALUE}
						width='40px'
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
