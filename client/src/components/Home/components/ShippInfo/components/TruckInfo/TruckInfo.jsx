import React from 'react';

import { transformDateFull } from 'helpers/transformDate';
import constants from 'utils/constants';

import './TruckInfo.css';

const TruckInfo = ({ shippInfo }) => (
	<div className='truck-info'>
		{shippInfo && shippInfo.truck.type === constants.SPRINTER_TYPE && (
			<img
				src={constants.SPRINTER_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width='110px'
			/>
		)}
		{shippInfo && shippInfo.truck.type === constants.SMALL_STRAIGHT_TYPE && (
			<img
				src={constants.SMALL_STRAIGHT_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width='140px'
			/>
		)}
		{shippInfo && shippInfo.truck.type === constants.LARGE_STRAIGHT_TYPE && (
			<img
				src={constants.LARGE_STRAIGHT_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width='140px'
			/>
		)}
		<div className='truck-info__content'>
			<p>
				Load assigned to driver with id{' '}
				{shippInfo && shippInfo.truck.assigned_to}.
			</p>
			<p>Truck type: {shippInfo && shippInfo.truck.type}</p>
			<p>
				Assigned at{' '}
				<span className='truck-info__text_italic'>
					{shippInfo && transformDateFull(shippInfo.load.logs[0].time)}
				</span>
			</p>
		</div>
	</div>
);

export default TruckInfo;
