import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import EditTruckForm from '../EditTruckForm/EditTruckForm';
import TruckImage from 'common/TruckImage/TruckImage';
import { transformDate } from 'helpers/transformDate';
import { setModalError } from 'store/app/actionCreator';
import constants from 'utils/constants';

import './TruckItem.css';
import TruckTableButtons from '../TruckTableButtons/TruckTableButtons';

const TruckItem = ({ truck, truckType, setTruckType }) => {
	const [isEditing, setIsEditing] = useState(false);

	const dispatch = useDispatch();

	const startEditTruck = () => setIsEditing(!isEditing);

	const displayErrorModal = (mess) => dispatch(setModalError(mess));

	return (
		<tr className='trucks__table-row'>
			<td className='trucks__table-data'>
				<div className='trucks__table-content'>
					<TruckImage
						type={truck.type}
						sprinterWidth={'45px'}
						smallStWidth={'55px'}
						largeStWidth={'60px'}
					/>
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
				<TruckTableButtons
					truck={truck}
					displayErrorModal={displayErrorModal}
					startEditTruck={startEditTruck}
				/>
			</td>
		</tr>
	);
};

export default TruckItem;
