import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getShippInfoRequest } from '../../../../store/loads/actionCreator';
import { selectShippInfo } from '../../../../store/loads/selectors';
import { transformDateFull } from '../../../../helpers/transformDate';
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
	SPRINTER_TYPE,
	LARGE_STRAIGHT_TYPE,
	SMALL_STRAIGHT_TYPE,
} from '../../../../utils/constants';

import './ShippInfo.css';

const ShippInfo = () => {
	const shippInfo = useSelector(selectShippInfo);
	const { loadId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		const data = { token: localStorage.getItem('token'), id: loadId };
		dispatch(getShippInfoRequest(data));
	}, [dispatch]);

	return (
		<div className='shipp-info'>
			<div className='shipp-info__header'>
				<Link to={LOADS_ROUTE} className='loads-form__link'>
					<img src={BACK_ICON_SRC} alt={BACK_ICON_ALT_VALUE} width='20px' />{' '}
					Back to loads
				</Link>
				<div className='shipp-info__status'>
					{shippInfo && shippInfo.load.status}
				</div>
			</div>
			<h2 className='shipp-info__title'>{shippInfo && shippInfo.load.name}</h2>
			<p className='shipp-info__state'>{shippInfo && shippInfo.load.state}</p>
			<div className='shipp-info__content'>
				<img
					src={DESTINATION_ICON_SRC}
					alt={DESTINATION_ICON_ALT_VALUE}
					width='50px'
				/>
				<div className='shipp-info__address'>
					<p>Pickup address: {shippInfo && shippInfo.load.pickup_address}</p>
					<p>
						Shipping address: {shippInfo && shippInfo.load.delivery_address}
					</p>
				</div>
			</div>
			<div>
				<p>
					Created at{' '}
					<span className='shipp-info__text_italic'>
						{shippInfo && transformDateFull(shippInfo.load.created_date)}
					</span>
				</p>
				<p>
					Latest update at{' '}
					<span className='shipp-info__text_italic'>
						{shippInfo && transformDateFull(shippInfo.load.updatedAt)}
					</span>
				</p>
			</div>
			<div>
				<h4 className='shipp-info__heading'>Truck</h4>
				<div className='shipp-info__truck'>
					{shippInfo && shippInfo.truck.type === SPRINTER_TYPE && (
						<img src={SPRINTER_SRC} alt={TRUCKS_ALT_VALUE} width='110px' />
					)}
					{shippInfo && shippInfo.truck.type === SMALL_STRAIGHT_TYPE && (
						<img
							src={SMALL_STRAIGHT_SRC}
							alt={TRUCKS_ALT_VALUE}
							width='140px'
						/>
					)}
					{shippInfo && shippInfo.truck.type === LARGE_STRAIGHT_TYPE && (
						<img
							src={LARGE_STRAIGHT_SRC}
							alt={TRUCKS_ALT_VALUE}
							width='140px'
						/>
					)}
					<div className='shipp-info__truck-cont'>
						<p>
							Load assigned to driver with id{' '}
							{shippInfo && shippInfo.truck.assigned_to}.
						</p>
						<p>Truck type: {shippInfo && shippInfo.truck.type}</p>
						<p>
							Assigned at{' '}
							<span className='shipp-info__text_italic'>
								{shippInfo && transformDateFull(shippInfo.load.logs[0].time)}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div>
				<h4 className='shipp-info__heading'>Dimensions</h4>
				<div className='shipp-info__truck shipp-info__block'>
					<img
						src={DIMENSIONS_ICON_SRC}
						alt={DIMENSIONS_ICON_ALT_VALUE}
						width='75px'
					/>
					<table className='shipp-info__table'>
						<thead>
							<tr>
								<th></th>
								<th className='shipp-info__th'>Width</th>
								<th className='shipp-info__th'>Length</th>
								<th className='shipp-info__th'>Height</th>
								<th className='shipp-info__th'>Payload</th>
							</tr>
						</thead>
						<tbody>
							<tr className='shipp-info__tr'>
								<th className='shipp-info__td'>Load</th>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.load.dimensions.width}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.load.dimensions.length}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.load.dimensions.height}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.load.payload}
								</td>
							</tr>
							<tr className='shipp-info__tr'>
								<th className='shipp-info__td'>Truck</th>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.truck.dimensions.width}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.truck.dimensions.length}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.truck.dimensions.height}
								</td>
								<td className='shipp-info__td'>
									{shippInfo && shippInfo.truck.dimensions.payload}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ShippInfo;
