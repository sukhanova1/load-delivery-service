import React from 'react';

import Button from '../../../../../common/Button/Button';
import { transformCreatedDateFull } from '../../../../../helpers/transformCreatedDate';
import {
	DESTINATION_ICON_ALT_VALUE,
	DESTINATION_ICON_SRC,
	DIMENSIONS_ICON_ALT_VALUE,
	DIMENSIONS_ICON_SRC,
	BUTTON_TYPE_BUTTON,
	BUTTON_TEXT_FINISH_DEL,
	LOAD_STATUS_SHIPPED,
} from '../../../../../utils/constants';

import './LoadItem.css';

function LoadItem({ load }) {
	const handleFinishDelivery = () => {
		console.log('delivery finished');
	};

	return (
		<div className='load-item'>
			<div className='load-item__content_al-end'>
				<h3 className='load-item__name'>{load && load.name}</h3>
				{load.status !== LOAD_STATUS_SHIPPED && (
					<div className='load-item__status'>{load && load.status}</div>
				)}
			</div>
			<p className='load-item__date'>
				Created at {transformCreatedDateFull(load.created_date)}
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
					Latest update at {transformCreatedDateFull(load.updatedAt)}
				</p>
				{load.status !== LOAD_STATUS_SHIPPED && (
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
