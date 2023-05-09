import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../../../../common/Button/Button';
import Modal from '../../../../common/Modal/Modal';
import Select from '../../../../common/Select/Select';
import TruckItem from './components/TruckItem';
import {
	addTruckRequest,
	getAllTrucksRequest,
} from '../../../../store/trucks/actionCreator';
import {
	selectModalSuccess,
	selectModalError,
} from '../../../../store/app/selectors';
import { selectTrucksArray } from '../../../../store/trucks/selectors';
import {
	BUTTON_TEXT_ADD,
	BUTTON_TYPE_SUBMIT,
	MODAL_TYPE_ERROR,
	MODAL_TYPE_SUCCESS,
	SELECT_ID_ADD_TRUCK,
	SPRINTER_TYPE,
	SELECT_TRUCK_OPTIONS,
} from '../../../../utils/constants';

import './Trucks.css';

const Trucks = () => {
	const [truckType, setTruckType] = useState(SPRINTER_TYPE);

	const trucks = useSelector(selectTrucksArray);
	const modalSucess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	const dispatch = useDispatch();

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
				{modalSucess && <Modal type={MODAL_TYPE_SUCCESS} text={modalSucess} />}
				{modalError && <Modal type={MODAL_TYPE_ERROR} text={modalError} />}
				<form onSubmit={handleAddTruck} className='trucks__form-box'>
					<p>Choose truck type:</p>
					<div>
						<Select
							id={SELECT_ID_ADD_TRUCK}
							options={SELECT_TRUCK_OPTIONS}
							setTruckType={setTruckType}
						/>
						<Button
							className='trucks__form-btn'
							type={BUTTON_TYPE_SUBMIT}
							text={BUTTON_TEXT_ADD}
						/>
					</div>
				</form>
				<div className='trucks__header-box'>
					<p>TRUCK DIMENTIONS</p>
					<table className='trucks__header-table'>
						<thead>
							<tr>
								<th className='trucks__header-td'>Type</th>
								<th className='trucks__header-td'>Width</th>
								<th className='trucks__header-td'>Length</th>
								<th className='trucks__header-td'>Height</th>
								<th className='trucks__header-td'>Payload</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='trucks__header-td'>SPRINTER</td>
								<td className='trucks__header-td'>250</td>
								<td className='trucks__header-td'>300</td>
								<td className='trucks__header-td'>170</td>
								<td className='trucks__header-td'>1700</td>
							</tr>
							<tr>
								<td className='trucks__header-td'>SMALL STRAIGHT</td>
								<td className='trucks__header-td'>250</td>
								<td className='trucks__header-td'>500</td>
								<td className='trucks__header-td'>170</td>
								<td className='trucks__header-td'>2500</td>
							</tr>
							<tr>
								<td className='trucks__header-td'>LARGE STRAIGHT</td>
								<td className='trucks__header-td'>350</td>
								<td className='trucks__header-td'>700</td>
								<td className='trucks__header-td'>270</td>
								<td className='trucks__header-td'>4000</td>
							</tr>
						</tbody>
					</table>
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
