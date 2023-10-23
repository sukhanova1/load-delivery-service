import React from 'react';

import TruckImage from 'common/TruckImage/TruckImage';
import { transformDateFull } from 'helpers/transformDate';

import './TruckInfo.css';

const TruckInfo = ({ shippInfo }) => (
	<div className='truck-info'>
		{shippInfo && (
			<TruckImage
				type={shippInfo.truck.type}
				sprinterWidth={'110px'}
				smallStWidth={'130px'}
				largeStWidth={'130px'}
			/>
		)}
		<div className='truck-info__content'>
			<p>
				Load assigned to driver with id{' '}
				{shippInfo && shippInfo.truck.assigned_to}
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
