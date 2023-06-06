import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import LoginForm from './components/Auth/components/LoginForm/LoginForm';
import RegisterForm from './components/Auth/components/RegisterForm/RegisterForm';
import ForgotPassForm from './components/Auth/components/ForgotPassForm/ForgotPassForm';
import Home from './components/Home/Home';
import ProfileInfo from './components/Home/components/ProfileInfo/ProfileInfo';
import Trucks from './components/Home/components/Trucks/Trucks';
import Loads from './components/Home/components/Loads/Loads';

import './App.css';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route exact path='/auth' element={<Auth />}>
						<Route path='login' element={<LoginForm />} />
						<Route path='register' element={<RegisterForm />} />
						<Route path='forgot-password' element={<ForgotPassForm />} />
					</Route>

					<Route exact path='/home' element={<Home />}>
						<Route path='profile' element={<ProfileInfo />} />
						<Route path='my-trucks' element={<Trucks />} />
						<Route path='my-loads' element={<Loads />} />
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
};

export default App;
