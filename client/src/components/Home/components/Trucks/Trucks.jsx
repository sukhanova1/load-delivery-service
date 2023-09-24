import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'common/Button/Button';
import Modal from 'common/Modal/Modal';
import Select from 'common/Select/Select';
import TruckItem from './components/TruckItem/TruckItem';
import TrucksTable from './components/TrucksTable/TrucksTable';
import {
	addTruckRequest,
	getAllTrucksRequest,
} from 'store/trucks/actionCreator';
import { selectModalSuccess, selectModalError } from 'store/app/selectors';
import { selectTrucksArray } from 'store/trucks/selectors';
import constants from 'utils/constants';

import './Trucks.css';

const Trucks = () => {
	const [truckType, setTruckType] = useState(constants.SPRINTER_TYPE);

	const trucks = useSelector(selectTrucksArray);
	const modalSuccess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	const dispatch = useDispatch();

	const handleSelectChange = (value) => {
		setTruckType(value);
	};
	const handleAddTruck = (e) => {
		e.preventDefault();
		const payload = { type: truckType, token: localStorage.getItem('token') };
		dispatch(addTruckRequest(payload));
		dispatch(getAllTrucksRequest(localStorage.getItem('token')));
	};

	useEffect(() => {
		dispatch(getAllTrucksRequest(localStorage.getItem('token')));
	}, [dispatch]);

	return (
		<div className='trucks'>
			<div className='trucks__header'>
				{modalSuccess && (
					<Modal type={constants.MODAL_TYPE_SUCCESS} text={modalSuccess} />
				)}
				{modalError && (
					<Modal type={constants.MODAL_TYPE_ERROR} text={modalError} />
				)}
				<form onSubmit={handleAddTruck} className='trucks__form-box'>
					<p className='trucks__header-title'>Choose truck type:</p>
					<div>
						<Select
							id={constants.SELECT_ID_ADD_TRUCK}
							options={constants.SELECT_TRUCK_OPTIONS}
							handleSelectChange={handleSelectChange}
							defaultValue={constants.SELECT_TRUCK_DEFAULT_VALUE}
						/>
						<Button
							className='trucks__form-btn'
							type={constants.BUTTON_TYPE_SUBMIT}
							text={constants.BUTTON_TEXT_ADD}
						/>
					</div>
				</form>
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
