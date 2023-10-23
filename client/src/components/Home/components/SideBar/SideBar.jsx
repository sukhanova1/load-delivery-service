import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from 'common/Logo/Logo';
import constants from 'utils/constants';

import './SideBar.css';

const sideBarItems = [
	{
		name: constants.TITLE_PROFILE,
		path: constants.PROFILE_ROUTE,
		imgSrc: constants.PROFILE_SRC,
		imgAltText: constants.PROFILE_ALT_VALUE,
		role: 'both',
	},
	{
		name: constants.TITLE_TRUCKS,
		path: constants.TRUCKS_ROUTE,
		imgSrc: constants.TRUCKS_SRC,
		imgAltText: constants.TRUCKS_ALT_VALUE,
		role: constants.DRIVER_ROLE,
	},
	{
		name: constants.TITLE_LOADS,
		path: constants.LOADS_ROUTE,
		imgSrc: constants.LOAD_SRC,
		imgAltText: constants.LOAD_ALT_VALUE,
		role: 'both',
	},
];

const SideBar = ({ role, toggle, toggleMenu, handleLogout }) => (
	<aside className={toggle ? 'sidebar' : 'sidebar sidebar-small'}>
		<div className='sidebar__header'>
			<img
				src={constants.MENU_BURGER_SRC}
				className='sidebar__icon'
				alt={constants.MENU_BURGER_ALT_VALUE}
				width='40px'
				onClick={toggleMenu}
			/>
			<Logo width='150px' />
		</div>
		<nav className='nav'>
			<div className='nav__user'>
				<Link to={constants.PROFILE_ROUTE} className='nav__link user-photo'>
					<img
						src={constants.USER_PHOTO_SRC}
						alt={constants.USER_PHOTO_ALT_VALUE}
						title={constants.TITLE_PROFILE}
					/>
				</Link>
			</div>
			<ul>
				{sideBarItems.map((item) => {
					if (item.role === 'both' || item.role === role) {
						return (
							<li className='nav__item' title={item.name} key={item.name}>
								<NavLink to={item.path} className='nav__link'>
									<img
										src={item.imgSrc}
										className='nav__icon'
										alt={item.imgAltText}
										width='35px'
									/>
									{item.name}
								</NavLink>
							</li>
						);
					}
				})}
			</ul>
			<div className='nav__item' onClick={handleLogout}>
				<div className='nav__link'>
					<img
						src={constants.LOGOUT_SRC}
						className='nav__icon'
						alt={constants.LOGOUT_ALT_VALUE}
						title={constants.TITLE_LOGOUT}
						width='35px'
					/>
					Logout
				</div>
			</div>
		</nav>
	</aside>
);

export default SideBar;
