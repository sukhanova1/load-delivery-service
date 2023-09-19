import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import { getUserInfoRequest, logoutRequest } from 'store/user/actionCreator';
import { selectUserRole, selectUserisAuth } from 'store/user/selectors';
import constants from 'utils/constants';

import './Home.css';

const Home = () => {
	const [toggle, setToggle] = useState(true);

	const isAuth = useSelector(selectUserisAuth);
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleMenu = () => setToggle(!toggle);

	const handleLogout = () => dispatch(logoutRequest());

	useEffect(() => {
		if (!isAuth) {
			navigate(constants.LOGIN_ROUTE);
		}
	}, [isAuth]);

	useEffect(() => {
		dispatch(getUserInfoRequest(localStorage.getItem('token')));
	}, [dispatch]);

	return (
		<>
			<Header toggle={toggle} handleLogout={handleLogout} />
			<SideBar
				role={userRole}
				toggle={toggle}
				toggleMenu={toggleMenu}
				handleLogout={handleLogout}
			/>
			<main className={toggle ? 'main' : 'main-large '}>
				<div className='main__content'>
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Home;
