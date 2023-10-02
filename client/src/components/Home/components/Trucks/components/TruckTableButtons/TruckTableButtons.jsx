import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'common/Button/Button';
import { selectTrucksArray } from 'store/trucks/selectors';
import {
	assignTruckRequest,
	deleteTruckRequest,
} from 'store/trucks/actionCreator';
import constants from 'utils/constants';

import './TruckTableButtons.css';

const TruckTableButtons = ({ truck, startEditTruck, displayErrorModal }) => {
	const trucks = useSelector(selectTrucksArray);

	const dispatch = useDispatch();

	const handleDeleteTruck = () => {
		const payload = {
			token: localStorage.getItem('token'),
			id: truck._id,
		};
		if (!truck.assigned_to) {
			dispatch(deleteTruckRequest(payload));
		} else {
			displayErrorModal('You can not delete assigned truck');
		}
	};

	const handleAssignTruck = () => {
		const payload = {
			token: localStorage.getItem('token'),
			id: truck._id,
		};
		const isAssigned = trucks.every((truck) => !truck.assigned_to);
		if (isAssigned) {
			dispatch(assignTruckRequest(payload));
		} else {
			return displayErrorModal('You can assign only one truck');
		}
	};

	return (
		<div className='trucks__table-btns'>
			<Button
				className='trucks__table-btn trucks__btn-edit'
				type={constants.BUTTON_TYPE_BUTTON}
				text={
					<img
						src={constants.EDIT_ICON_SRC}
						alt={constants.EDIT_ICON_ALT_VALUE}
						width='25px'
					/>
				}
				onClick={startEditTruck}
			/>
			<Button
				className='trucks__table-btn trucks__btn-delete'
				type={constants.BUTTON_TYPE_BUTTON}
				text={
					<img
						src={constants.DELETE_ICON_SRC}
						alt={constants.DELETE_ICON_ALT_VALUE}
						width='25px'
					/>
				}
				onClick={handleDeleteTruck}
			/>
			<Button
				className='trucks__table-btn trucks__btn-assign'
				type={constants.BUTTON_TYPE_BUTTON}
				text={constants.BUTTON_TEXT_ASSIGN}
				onClick={handleAssignTruck}
			/>
		</div>
	);
};

export default TruckTableButtons;
