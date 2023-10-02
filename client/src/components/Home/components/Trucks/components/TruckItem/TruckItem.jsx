import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditTruckForm from '../EditTruckForm/EditTruckForm';
import Button from 'common/Button/Button';
import { transformDate } from 'helpers/transformDate';
import { selectTrucksArray } from 'store/trucks/selectors';
import { setModalError } from 'store/app/actionCreator';
import {
	assignTruckRequest,
	deleteTruckRequest,
} from 'store/trucks/actionCreator';
import constants from 'utils/constants';

import './TruckItem.css';

const TruckItem = ({ truck, truckType, setTruckType }) => {
	const [isEditing, setIsEditing] = useState(false);

	const trucks = useSelector(selectTrucksArray);

	const dispatch = useDispatch();

	const startEditTruck = () => setIsEditing(!isEditing);

	const displayErrorModal = (mess) => dispatch(setModalError(mess));

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
		<tr className='trucks__table-row'>
			<td className='trucks__table-data'>
				<div className='trucks__table-content'>
					{truck.type === constants.SPRINTER_TYPE && (
						<img
							src={constants.SPRINTER_SRC}
							alt={constants.TRUCKS_ALT_VALUE}
							width='45px'
						/>
					)}
					{truck.type === constants.SMALL_STRAIGHT_TYPE && (
						<img
							src={constants.SMALL_STRAIGHT_SRC}
							alt={constants.TRUCKS_ALT_VALUE}
							width='55px'
						/>
					)}
					{truck.type === constants.LARGE_STRAIGHT_TYPE && (
						<img
							src={constants.LARGE_STRAIGHT_SRC}
							alt={constants.TRUCKS_ALT_VALUE}
							width='60px'
						/>
					)}
					<div>
						{truck.type}
						<p className='trucks__table-text'>Id: {truck._id}</p>
					</div>
				</div>
				{isEditing && (
					<EditTruckForm
						truckType={truckType}
						setTruckType={setTruckType}
						truck={truck}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						displayErrorModal={displayErrorModal}
					/>
				)}
			</td>
			<td className='trucks__table-data'>
				{transformDate(truck.created_date)}
			</td>
			<td className='trucks__table-data'>
				{truck.status === constants.TRUCK_STATUS_IS && 'In Service'}
				{truck.status === constants.TRUCK_STATUS_OL && 'On Load'}
			</td>
			<td className='trucks__table-data'>
				{truck.assigned_to ? (
					<div className='trucks__table-content'>
						<img
							src={constants.DOUBLE_TICK_SRC}
							alt={constants.DOUBLE_TICK_ALT_VALUE}
							width='30px'
						/>
						{truck.assigned_to}
					</div>
				) : (
					<p>Not assigned</p>
				)}
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
			</td>
		</tr>
	);
};

export default TruckItem;
