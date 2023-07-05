import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../../../../common/Logo/Logo';
import {
	DRIVER_ROLE,
	LOADS_ROUTE,
	LOAD_ALT_VALUE,
	LOAD_SRC,
	LOGOUT_ALT_VALUE,
	LOGOUT_SRC,
	MENU_BURGER_ALT_VALUE,
	MENU_BURGER_SRC,
	PROFILE_ALT_VALUE,
	PROFILE_ROUTE,
	PROFILE_SRC,
	TITLE_LOADS,
	TITLE_PROFILE,
	TITLE_TRUCKS,
	TRUCKS_ALT_VALUE,
	TRUCKS_ROUTE,
	TRUCKS_SRC,
	USER_PHOTO_ALT_VALUE,
	USER_PHOTO_SRC,
} from '../../../../utils/constants';

import './SideBar.css';

const sideBarItems = [
	{
		name: TITLE_PROFILE,
		path: PROFILE_ROUTE,
		imgSrc: PROFILE_SRC,
		imgAltText: PROFILE_ALT_VALUE,
		role: 'both',
	},
	{
		name: TITLE_TRUCKS,
		path: TRUCKS_ROUTE,
		imgSrc: TRUCKS_SRC,
		imgAltText: TRUCKS_ALT_VALUE,
		role: DRIVER_ROLE,
	},
	{
		name: TITLE_LOADS,
		path: LOADS_ROUTE,
		imgSrc: LOAD_SRC,
		imgAltText: LOAD_ALT_VALUE,
		role: 'both',
	},
];

const SideBar = ({ role, toggle, toggleMenu, handleLogout }) => {
	return (
		<aside className={toggle ? 'sidebar' : 'sidebar sidebar-small'}>
			<div className='sidebar__header'>
				<img
					src={MENU_BURGER_SRC}
					className='sidebar__icon'
					alt={MENU_BURGER_ALT_VALUE}
					width='40px'
					onClick={toggleMenu}
				/>
				<Logo width='150px' />
			</div>
			<nav className='nav'>
				<div className='nav__user'>
					<Link to={PROFILE_ROUTE} className='nav__link user-photo'>
						<img
							src={USER_PHOTO_SRC}
							alt={USER_PHOTO_ALT_VALUE}
							title={TITLE_PROFILE}
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
							src={LOGOUT_SRC}
							className='nav__icon'
							alt={LOGOUT_ALT_VALUE}
							width='35px'
						/>
						Logout
					</div>
				</div>
			</nav>
		</aside>
	);
};

export default SideBar;
