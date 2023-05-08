import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../../../../common/Button/Button';
import Modal from '../../../../common/Modal/Modal';
import {
	addTruckRequest,
	getAllTrucksRequest,
} from '../../../../store/trucks/actionCreator';
import {
	selectModalSuccess,
	selectModalError,
} from '../../../../store/app/selectors';
import {
	BUTTON_TEXT_ADD,
	BUTTON_TEXT_ASSIGN,
	BUTTON_TEXT_DELETE,
	BUTTON_TEXT_EDIT,
	BUTTON_TEXT_OK,
	BUTTON_TYPE_BUTTON,
	BUTTON_TYPE_SUBMIT,
	LARGE_STRAIGHT_TYPE,
	MODAL_TYPE_ERROR,
	MODAL_TYPE_SUCCESS,
	SELECT_ID_ADD_TRUCK,
	SELECT_ID_EDIT_TRUCK,
	SMALL_STRAIGHT_TYPE,
	SPRINTER_TYPE,
} from '../../../../utils/constants';

import './Trucks.css';
import Select from '../../../../common/Select/Select';

const selectOptions = [SPRINTER_TYPE, SMALL_STRAIGHT_TYPE, LARGE_STRAIGHT_TYPE];

const Trucks = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [truckType, setTruckType] = useState(SPRINTER_TYPE);

	const modalSucess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	const dispatch = useDispatch();

	const handleAddTruck = (e) => {
		e.preventDefault();
		const payload = { type: truckType, token: localStorage.getItem('token') };
		dispatch(addTruckRequest(payload));
	};

	const startEditTruck = () => {
		setIsEditing(!isEditing);
	};

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
							options={selectOptions}
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
							<th>Created by</th>
							<th>Assigned to</th>
						</tr>
					</thead>
					<tbody>
						<tr className='trucks__table-row'>
							<td className='trucks__table-data'>
								<div className='trucks__table-content'>
									<img
										src='/assets/icons/sprinter-icon.png'
										alt='truck icon'
										width='50px'
									/>
									<div>
										SPRINTER
										<p className='trucks__table-text'>Id: 345d455d54e5</p>
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
											options={selectOptions}
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
							<td className='trucks__table-data'>August 6, 2020</td>
							<td className='trucks__table-data'>In Service</td>
							<td className='trucks__table-data'>355465d67cf6</td>
							<td className='trucks__table-data'>35454s45544d</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Trucks;
