import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'common/Button/Button';
import Select from 'common/Select/Select';
import { editTruckRequest } from 'store/trucks/actionCreator';
import constants from 'utils/constants';

import '../TruckItem/TruckItem.css';

const EditTruckForm = ({
	truckType,
	setTruckType,
	truck,
	isEditing,
	setIsEditing,
	displayErrorModal,
}) => {
	const dispatch = useDispatch();
	const handleSelectChange = (value) => {
		setTruckType(value);
	};
	const handleEditTruck = (e) => {
		e.preventDefault();
		const payload = {
			type: truckType,
			token: localStorage.getItem('token'),
			id: truck._id,
		};
		if (!truck.assigned_to) {
			dispatch(editTruckRequest(payload));
		} else {
			displayErrorModal('You can not edit assigned truck info');
		}
		setIsEditing(!isEditing);
	};

	return (
		<form onSubmit={handleEditTruck}>
			<Select
				id={constants.SELECT_ID_EDIT_TRUCK}
				options={constants.SELECT_TRUCK_OPTIONS}
				handleSelectChange={handleSelectChange}
			/>
			<Button
				className='trucks__table-btn trucks__btn-ok'
				type={constants.BUTTON_TYPE_SUBMIT}
				text={constants.BUTTON_TEXT_OK}
			/>
		</form>
	);
};

export default EditTruckForm;
