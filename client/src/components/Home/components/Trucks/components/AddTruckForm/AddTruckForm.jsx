import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'common/Button/Button';
import Select from 'common/Select/Select';
import {
	addTruckRequest,
	getAllTrucksRequest,
} from 'store/trucks/actionCreator';
import constants from 'utils/constants';

import './AddTruckForm.css';

const AddTruckForm = ({ truckType, setTruckType }) => {
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

	return (
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
	);
};

export default AddTruckForm;
