import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'common/Button/Button';
import LoadItemButtons from '../LoadItemButtons/LoadItemButtons';
import { transformDateFull } from 'helpers/transformDate';
import { iterateToNextStateRequest } from 'store/loads/actionCreator';
import { selectUserRole } from 'store/user/selectors';
import constants from 'utils/constants';

import './LoadItem.css';

const LoadItem = ({ load }) => {
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();

	const handleFinishDelivery = () => {
		dispatch(iterateToNextStateRequest(localStorage.getItem('token')));
	};

	return (
		<div className='load-item'>
			<div className='load-item__content_al-end'>
				<h3 className='load-item__name'>{load && load.name}</h3>
				{userRole === constants.DRIVER_ROLE &&
					load.status !== constants.LOAD_STATUS_SHIPPED && (
						<div className='load-item__status'>{load && load.status}</div>
					)}
				{userRole === constants.SHIPPER_ROLE && (
					<div className='load-item__status'>{load && load.status}</div>
				)}
			</div>
			<p className='load-item__date'>
				Created at {transformDateFull(load.created_date)}
			</p>
			<p className='load-item__state'>{load && load.state}</p>
			<div className='load-item__content'>
				<img
					src={constants.DIMENSIONS_ICON_SRC}
					alt={constants.DIMENSIONS_ICON_ALT_VALUE}
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
					src={constants.DESTINATION_ICON_SRC}
					alt={constants.DESTINATION_ICON_ALT_VALUE}
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
				{userRole === constants.SHIPPER_ROLE &&
					load.status === constants.LOAD_STATUS_NEW && (
						<LoadItemButtons load={load} />
					)}
				{userRole === constants.DRIVER_ROLE &&
					load.status !== constants.LOAD_STATUS_SHIPPED && (
						<Button
							className='load-item__btn'
							type={constants.BUTTON_TYPE_BUTTON}
							text={constants.BUTTON_TEXT_FINISH_DEL}
							onClick={handleFinishDelivery}
						/>
					)}
			</div>
			{userRole === constants.SHIPPER_ROLE &&
				load.status === constants.LOAD_STATUS_ASSIGNED && (
					<Link to={`shipping-info/${load._id}`} className='load-item__link'>
						Show more...
					</Link>
				)}
		</div>
	);
};

export default LoadItem;
