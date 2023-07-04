import React from 'react';
import { Link } from 'react-router-dom';

import {
	LOADS_ROUTE,
	BACK_ICON_SRC,
	BACK_ICON_ALT_VALUE,
	DESTINATION_ICON_SRC,
	DESTINATION_ICON_ALT_VALUE,
	SPRINTER_SRC,
	SMALL_STRAIGHT_SRC,
	LARGE_STRAIGHT_SRC,
	TRUCKS_ALT_VALUE,
	DIMENSIONS_ICON_SRC,
	DIMENSIONS_ICON_ALT_VALUE,
} from '../../../../utils/constants';

import './ShippInfo.css';

const ShippInfo = () => {
	return (
		<div className='shipp-info'>
			<div className='shipp-info__header'>
				<Link to={LOADS_ROUTE} className='loads-form__link'>
					<img src={BACK_ICON_SRC} alt={BACK_ICON_ALT_VALUE} width='20px' />{' '}
					Back to loads
				</Link>
				<div className='shipp-info__status'>{}</div>
			</div>
			<h2 className='shipp-info__title'>{}</h2>
			<p className='shipp-info__state'>{}</p>
			<div className='shipp-info__content'>
				<img
					src={DESTINATION_ICON_SRC}
					alt={DESTINATION_ICON_ALT_VALUE}
					width='50px'
				/>
				<div className='shipp-info__address'>
					<p>Pickup address: {}</p>
					<p>Shipping address: {}</p>
				</div>
			</div>
			<div>
				<p>
					Created at <span className='shipp-info__text_italic'>{}</span>
				</p>
				<p>
					Latest update at <span className='shipp-info__text_italic'>{}</span>
				</p>
			</div>
			<div className='shipp-info__block'>
				<h4 className='shipp-info__heading'>Load dimensions</h4>
				<div className='shipp-info__truck'>
					<img
						src={DIMENSIONS_ICON_SRC}
						alt={DIMENSIONS_ICON_ALT_VALUE}
						width='110px'
					/>
					<div className='shipp-info__block'>
						<p>Payload: {}</p>
						<p>Width: {}</p>
						<p>Length: {}</p>
						<p>Height: {}</p>
					</div>
				</div>
			</div>
			<div className='shipp-info__block'>
				<h4 className='shipp-info__heading'>Truck</h4>
				<div className='shipp-info__truck'>
					<img src={SPRINTER_SRC} alt={TRUCKS_ALT_VALUE} width='145px' />
					<div className='shipp-info__block'>
						<p>Load assigned to driver with id {}.</p>
						<p>Truck type: {}</p>
						<p>Assigned at: {}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippInfo;
