import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import { logoutRequest } from '../../store/user/actionCreator';
import { selectUserisAuth } from '../../store/user/selectors';
import { LOGIN_ROUTE } from '../../utils/constants';

import './Home.css';

const Home = () => {
	const [toggle, setToggle] = useState(true);

	const isAuth = useSelector(selectUserisAuth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleMenu = () => setToggle(!toggle);

	const handleLogout = () => dispatch(logoutRequest());

	useEffect(() => {
		if (!isAuth) {
			navigate(LOGIN_ROUTE);
		}
	}, [isAuth]);

	return (
		<>
			<Header toggle={toggle} handleLogout={handleLogout} />
			<SideBar
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
