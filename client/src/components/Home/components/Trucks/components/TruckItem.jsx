import React, { useState } from 'react';

import Button from '../../../../../common/Button/Button';
import Select from '../../../../../common/Select/Select';
import { transformCreatedDate } from '../../../../../helpers/transformCreatedDate';
import {
	BUTTON_TYPE_BUTTON,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TEXT_EDIT,
	BUTTON_TEXT_DELETE,
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
} from '../../../../../utils/constants';

import './TruckItem.css';

const TruckItem = ({ truck, setTruckType }) => {
	const [isEditing, setIsEditing] = useState(false);

	const startEditTruck = () => setIsEditing(!isEditing);

	const handleEditTruck = () => {
		setIsEditing(!isEditing);
		console.log('sucesssfully edited');
	};

	const handleDeleteTruck = () => {
		console.log('sucesssfully deleted');
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
				<div className='trucks__table-btns'>
					<Button
						className='trucks__table-btn trucks__btn-edit'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_EDIT}
						onClick={startEditTruck}
					/>
					<Button
						className='trucks__table-btn trucks__btn-delete'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_DELETE}
						onClick={handleDeleteTruck}
					/>
					<Button
						className='trucks__table-btn trucks__btn-assign'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_ASSIGN}
						onClick={handleAssignTruck}
					/>
				</div>
				{isEditing && (
					<div>
						<Select
							id={SELECT_ID_EDIT_TRUCK}
							options={SELECT_TRUCK_OPTIONS}
							setTruckType={setTruckType}
						/>
						<Button
							className='trucks__table-btn trucks__btn-ok'
							type={BUTTON_TYPE_SUBMIT}
							text={BUTTON_TEXT_OK}
							onClick={handleEditTruck}
						/>
					</div>
				)}
			</td>
			<td className='trucks__table-data'>
				{transformCreatedDate(truck.created_date)}
			</td>
			<td className='trucks__table-data'>
				{truck.status === TRUCK_STATUS_IS && 'In Service'}
				{truck.status === TRUCK_STATUS_OL && 'On Load'}
			</td>
			<td className='trucks__table-data'>{truck.created_by}</td>
			<td className='trucks__table-data'>
				{!truck.assigned_to && 'Not assigned'}
				{truck.assigned_to && truck.assigned_to}
			</td>
		</tr>
	);
};

export default TruckItem;
