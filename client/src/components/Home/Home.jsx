import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';

import './Home.css';

const Home = () => {
	const [toggle, setToggle] = useState(true);

	const toggleMenu = () => setToggle(!toggle);

	const handleLogout = () => {
		console.log('logout');
		console.log('logout');
	};
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
