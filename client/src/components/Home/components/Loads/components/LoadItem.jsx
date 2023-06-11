import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../common/Button/Button';
import { transformDateFull } from '../../../../../helpers/transformDate';
import { iterateToNextStateRequest } from '../../../../../store/loads/actionCreator';
import { selectUserRole } from '../../../../../store/user/selectors';
import {
	DESTINATION_ICON_ALT_VALUE,
	DESTINATION_ICON_SRC,
	DIMENSIONS_ICON_ALT_VALUE,
	DIMENSIONS_ICON_SRC,
	BUTTON_TYPE_BUTTON,
	BUTTON_TEXT_FINISH_DEL,
	LOAD_STATUS_SHIPPED,
	DRIVER_ROLE,
	SHIPPER_ROLE,
	LOAD_STATUS_NEW,
	BUTTON_TEXT_POST,
	EDIT_ICON_SRC,
	EDIT_ICON_ALT_VALUE,
	DELETE_ICON_SRC,
	DELETE_ICON_ALT_VALUE,
} from '../../../../../utils/constants';

import './LoadItem.css';

function LoadItem({ load }) {
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();

	const handleEditLoad = () => {
		console.log('load edited');
	};

	const handleDeleteLoad = () => {
		console.log('load deleted');
	};

	const handlePostLoad = () => {
		console.log('load posted');
	};

	const handleFinishDelivery = () => {
		dispatch(iterateToNextStateRequest(localStorage.getItem('token')));
	};

	return (
		<div className='load-item'>
			<div className='load-item__content_al-end'>
				<h3 className='load-item__name'>{load && load.name}</h3>
				{userRole === DRIVER_ROLE && load.status !== LOAD_STATUS_SHIPPED && (
					<div className='load-item__status'>{load && load.status}</div>
				)}
				{userRole === SHIPPER_ROLE && (
					<div className='load-item__status'>{load && load.status}</div>
				)}
			</div>
			<p className='load-item__date'>
				Created at {transformDateFull(load.created_date)}
			</p>
			<p className='load-item__state'>{load && load.state}</p>
			<div className='load-item__content'>
				<img
					src={DIMENSIONS_ICON_SRC}
					alt={DIMENSIONS_ICON_ALT_VALUE}
					width='45px'
				/>
				<div>
					<p>
						{load.dimensions.length} &#215; {load.dimensions.width} &#215;{' '}
						{load.dimensions.height}
					</p>
					<p>Payload: {load.payload}</p>
				</div>
			</div>
			<div className='load-item__content'>
				<img
					src={DESTINATION_ICON_SRC}
					alt={DESTINATION_ICON_ALT_VALUE}
					width='45px'
				/>
				<div className='load-item__address'>
					<p>Pickup address: {load.pickup_address}</p>
					<p>Shipping address: {load.delivery_address}</p>
				</div>
			</div>
			<div className='load-item__content_al-end'>
				<p className='load-item__date'>
					Latest update at {transformDateFull(load.updatedAt)}
				</p>
				{userRole === SHIPPER_ROLE && load.status === LOAD_STATUS_NEW && (
					<div className='load-item__btns-box'>
						<Button
							className='load-item__img-btn'
							type={BUTTON_TYPE_BUTTON}
							text={
								<img
									src={EDIT_ICON_SRC}
									alt={EDIT_ICON_ALT_VALUE}
									width='20px'
								/>
							}
							onClick={handleEditLoad}
						/>
						<Button
							className='load-item__img-btn'
							type={BUTTON_TYPE_BUTTON}
							text={
								<img
									src={DELETE_ICON_SRC}
									alt={DELETE_ICON_ALT_VALUE}
									width='20px'
								/>
							}
							onClick={handleDeleteLoad}
						/>
						<Button
							className='load-item__btn'
							type={BUTTON_TYPE_BUTTON}
							text={BUTTON_TEXT_POST}
							onClick={handlePostLoad}
						/>
					</div>
				)}
				{userRole === DRIVER_ROLE && load.status !== LOAD_STATUS_SHIPPED && (
					<Button
						className='load-item__btn'
						type={BUTTON_TYPE_BUTTON}
						text={BUTTON_TEXT_FINISH_DEL}
						onClick={handleFinishDelivery}
					/>
				)}
			</div>
		</div>
	);
}

export default LoadItem;
