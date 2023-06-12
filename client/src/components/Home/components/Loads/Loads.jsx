import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadItem from '../Loads/components/LoadItem';
import {
	getActiveLoadsRequest,
	getLoadsRequest,
} from '../../../../store/loads/actionCreator';
import {
	selectActiveLoads,
	selectLoads,
	selectShipedLoads,
} from '../../../../store/loads/selectors';
import { selectUserRole } from '../../../../store/user/selectors';
import {
	BUTTON_TEXT_ADD_LOAD,
	BUTTON_TYPE_BUTTON,
	DRIVER_ROLE,
	SHIPPER_ROLE,
} from '../../../../utils/constants';

import './Loads.css';
import Button from '../../../../common/Button/Button';

const Loads = () => {
	const userRole = useSelector(selectUserRole);
	const loads = useSelector(selectLoads);
	const activeLoads = useSelector(selectActiveLoads);
	const shippedLoads = useSelector(selectShipedLoads);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleAddNewLoad = () => navigate('add');

	useEffect(() => {
		if (userRole === DRIVER_ROLE) {
			dispatch(getActiveLoadsRequest(localStorage.getItem('token')));
		}
		if (userRole === SHIPPER_ROLE) {
			dispatch(getLoadsRequest(localStorage.getItem('token')));
		}
	}, [dispatch]);

	return (
		<div className='loads'>
			{userRole === SHIPPER_ROLE && (
				<div className='loads__container'>
					<Button
						className='loads__btn'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_ADD_LOAD}
						onClick={handleAddNewLoad}
					/>
					{loads.length === 0 && (
						<p className='loads__mess'>You do not have any loads...</p>
					)}
					{loads &&
						loads.map((load) => <LoadItem key={load._id} load={load} />)}
				</div>
			)}
			{userRole === DRIVER_ROLE && (
				<>
					<div className='loads__container'>
						<h2 className='loads__title'>Active</h2>
						{activeLoads.length === 0 && (
							<p className='loads__mess'>You do not have any active loads...</p>
						)}
						{activeLoads &&
							activeLoads.map((load) => (
								<LoadItem key={load._id} load={load} />
							))}
					</div>
					<div className='loads__container'>
						<h2 className='loads__title'>Shipped</h2>
						{shippedLoads.length === 0 && (
							<p className='loads__mess'>
								You do not have any shipped loads...
							</p>
						)}
						{shippedLoads &&
							shippedLoads.map((load) => (
								<LoadItem key={load._id} load={load} />
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Loads;
