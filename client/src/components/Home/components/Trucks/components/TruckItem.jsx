import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../../../common/Button/Button';
import Select from '../../../../../common/Select/Select';
import { transformCreatedDate } from '../../../../../helpers/transformCreatedDate';
import {
	deleteTruckRequest,
	editTruckRequest,
	getAllTrucksRequest,
} from '../../../../../store/trucks/actionCreator';
import {
	BUTTON_TYPE_BUTTON,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TEXT_ASSIGN,
	SELECT_ID_EDIT_TRUCK,
	BUTTON_TEXT_OK,
	SELECT_TRUCK_OPTIONS,
	SPRINTER_TYPE,
	TRUCKS_ALT_VALUE,
	SMALL_STRAIGHT_SRC,
	SPRINTER_SRC,
	SMALL_STRAIGHT_TYPE,
	LARGE_STRAIGHT_TYPE,
	LARGE_STRAIGHT_SRC,
	TRUCK_STATUS_IS,
	TRUCK_STATUS_OL,
	EDIT_ICON_SRC,
	EDIT_ICON_ALT_VALUE,
	DELETE_ICON_SRC,
	DELETE_ICON_ALT_VALUE,
	DOUBLE_TICK_SRC,
	DOUBLE_TICK_ALT_VALUE,
} from '../../../../../utils/constants';

import './TruckItem.css';

const TruckItem = ({ truck, truckType, setTruckType }) => {
	const [isEditing, setIsEditing] = useState(false);

	const dispatch = useDispatch();

	const startEditTruck = () => setIsEditing(!isEditing);

	const handleEditTruck = (e) => {
		e.preventDefault();
		const payload = {
			type: truckType,
			token: localStorage.getItem('token'),
			id: truck._id,
		};
		dispatch(editTruckRequest(payload));
		dispatch(getAllTrucksRequest(localStorage.getItem('token')));
		setIsEditing(!isEditing);
	};

	const handleDeleteTruck = () => {
		const payload = {
			token: localStorage.getItem('token'),
			id: truck._id,
		};
		dispatch(deleteTruckRequest(payload));
	};

	const handleAssignTruck = () => {
		console.log('sucesssfully assigned');
	};

	return (
		<tr className='trucks__table-row'>
			<td className='trucks__table-data'>
				<div className='trucks__table-content'>
					{truck.type === SPRINTER_TYPE && (
						<img src={SPRINTER_SRC} alt={TRUCKS_ALT_VALUE} width='45px' />
					)}
					{truck.type === SMALL_STRAIGHT_TYPE && (
						<img src={SMALL_STRAIGHT_SRC} alt={TRUCKS_ALT_VALUE} width='55px' />
					)}
					{truck.type === LARGE_STRAIGHT_TYPE && (
						<img src={LARGE_STRAIGHT_SRC} alt={TRUCKS_ALT_VALUE} width='60px' />
					)}
					<div>
						{truck.type}
						<p className='trucks__table-text'>Id: {truck._id}</p>
					</div>
				</div>
				{isEditing && (
					<form onSubmit={handleEditTruck}>
						<Select
							id={SELECT_ID_EDIT_TRUCK}
							options={SELECT_TRUCK_OPTIONS}
							setTruckType={setTruckType}
						/>
						<Button
							className='trucks__table-btn trucks__btn-ok'
							type={BUTTON_TYPE_SUBMIT}
							text={BUTTON_TEXT_OK}
						/>
					</form>
				)}
			</td>
			<td className='trucks__table-data'>
				{transformCreatedDate(truck.created_date)}
			</td>
			<td className='trucks__table-data'>
				{truck.status === TRUCK_STATUS_IS && 'In Service'}
				{truck.status === TRUCK_STATUS_OL && 'On Load'}
			</td>
			<td className='trucks__table-data'>
				{truck.assigned_to ? (
					<div className='trucks__table-content'>
						<img
							src={DOUBLE_TICK_SRC}
							alt={DOUBLE_TICK_ALT_VALUE}
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
						type={BUTTON_TYPE_BUTTON}
						text={
							<img src={EDIT_ICON_SRC} alt={EDIT_ICON_ALT_VALUE} width='25px' />
						}
						onClick={startEditTruck}
					/>
					<Button
						className='trucks__table-btn trucks__btn-delete'
						type={BUTTON_TYPE_BUTTON}
						text={
							<img
								src={DELETE_ICON_SRC}
								alt={DELETE_ICON_ALT_VALUE}
								width='25px'
							/>
						}
						onClick={handleDeleteTruck}
					/>
					<Button
						className='trucks__table-btn trucks__btn-assign'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_ASSIGN}
						onClick={handleAssignTruck}
					/>
				</div>
			</td>
		</tr>
	);
};

export default TruckItem;
