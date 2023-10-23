import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Auth from 'components/Auth/Auth';
import LoginForm from 'components/Auth/components/LoginForm/LoginForm';
import RegisterForm from 'components/Auth/components/RegisterForm/RegisterForm';
import ForgotPassForm from 'components/Auth/components/ForgotPassForm/ForgotPassForm';
import Home from 'components/Home/Home';
import ProfileInfo from 'components/Home/components/ProfileInfo/ProfileInfo';
import Trucks from 'components/Home/components/Trucks/Trucks';
import Loads from 'components/Home/components/Loads/Loads';
import LoadsForm from 'components/Home/components/LoadsForm/LoadsForm';
import ShippInfo from 'components/Home/components/ShippInfo/ShippInfo';
import constants from 'utils/constants';

import './App.css';

const App = () => (
	<div className='App'>
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path='/'
					element={
						localStorage.getItem('token') ? (
							<Navigate to={constants.LOADS_ROUTE} />
						) : (
							<Navigate to={constants.LOGIN_ROUTE} />
						)
					}
				/>

				<Route exact path='/auth' element={<Auth />}>
					<Route path='login' element={<LoginForm />} />
					<Route path='register' element={<RegisterForm />} />
					<Route path='forgot-password' element={<ForgotPassForm />} />
				</Route>

				<Route exact path='/home' element={<Home />}>
					<Route path='profile' element={<ProfileInfo />} />
					<Route path='my-loads' element={<Loads />} />
					<Route path='my-trucks' element={<Trucks />} />
					<Route path='my-loads'>
						<Route path='add' element={<LoadsForm />} />
						<Route path='update/:loadId' element={<LoadsForm />} />
						<Route path='shipping-info/:loadId' element={<ShippInfo />} />
					</Route>
				</Route>

				<Route
					path='*'
					element={
						<div
							style={{
								fontSize: '30px',
								margin: '30px 60px',
							}}
						>
							404 Page not found!
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	</div>
);

export default App;
