import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadItem from '../Loads/components/LoadItem';
import {
	getActiveLoadsRequest,
	iterateToNextStateRequest,
} from '../../../../store/loads/actionCreator';
import {
	selectActiveLoads,
	selectShipedLoads,
} from '../../../../store/loads/selectors';

import './Loads.css';

const Loads = () => {
	const activeLoads = useSelector(selectActiveLoads);
	const shippedLoads = useSelector(selectShipedLoads);

	const dispatch = useDispatch();

	const handleFinishDelivery = () => {
		dispatch(iterateToNextStateRequest(localStorage.getItem('token')));
	};

	useEffect(() => {
		dispatch(getActiveLoadsRequest(localStorage.getItem('token')));
	}, [dispatch]);

	return (
		<div className='loads'>
			<div className='loads__container'>
				<h2 className='loads__title'>Active</h2>
				{activeLoads.length === 0 && (
					<p className='loads__mess'>You do not have any active loads...</p>
				)}
				{activeLoads &&
					activeLoads.map((load) => (
						<LoadItem
							key={load._id}
							load={load}
							handleFinishDelivery={handleFinishDelivery}
						/>
					))}
			</div>
			<div className='loads__container'>
				<h2 className='loads__title'>Shipped</h2>
				{shippedLoads.length === 0 && (
					<p className='loads__mess'>You do not have any shipped loads...</p>
				)}
				{shippedLoads &&
					shippedLoads.map((load) => <LoadItem key={load._id} load={load} />)}
			</div>
		</div>
	);
};

export default Loads;
