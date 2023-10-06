import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notification from 'common/Notification/Notification';
import TruckItem from './components/TruckItem/TruckItem';
import TrucksTable from './components/TrucksTable/TrucksTable';
import AddTruckForm from './components/AddTruckForm/AddTruckForm';
import { getAllTrucksRequest } from 'store/trucks/actionCreator';
import { selectTrucksArray } from 'store/trucks/selectors';
import constants from 'utils/constants';

import './Trucks.css';

const Trucks = () => {
	const [truckType, setTruckType] = useState(constants.SPRINTER_TYPE);

	const trucks = useSelector(selectTrucksArray);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTrucksRequest(localStorage.getItem('token')));
	}, [dispatch]);

	return (
		<div className='trucks'>
			<div className='trucks__header'>
				<Notification />
				<AddTruckForm truckType={truckType} setTruckType={setTruckType} />
				<div className='trucks__header-box'>
					<p className='trucks__header-title'>TRUCK DIMENSIONS</p>
					<TrucksTable />
				</div>
			</div>
			<div>
				<table className='trucks__table'>
					<thead>
						<tr className='trucks__table-row trucks__table-header'>
							<th>Truck Type</th>
							<th>Creation Date</th>
							<th>Status</th>
							<th>Assigned to</th>
						</tr>
					</thead>
					<tbody>
						{trucks &&
							trucks.map((truck) => (
								<TruckItem
									truck={truck}
									truckType={truckType}
									setTruckType={setTruckType}
									key={truck._id}
								/>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Trucks;
