import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TruckInfo from './components/TruckInfo/TruckInfo';
import ShippInfoTable from './components/ShippInfoTable/ShippInfoTable';
import { getShippInfoRequest } from 'store/loads/actionCreator';
import { selectShippInfo } from 'store/loads/selectors';
import { transformDateFull } from 'helpers/transformDate';
import constants from 'utils/constants';

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
				<Link to={constants.LOADS_ROUTE} className='loads-form__link'>
					<img
						src={constants.BACK_ICON_SRC}
						alt={constants.BACK_ICON_ALT_VALUE}
						width='20px'
					/>
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
					src={constants.DESTINATION_ICON_SRC}
					alt={constants.DESTINATION_ICON_ALT_VALUE}
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
				<TruckInfo shippInfo={shippInfo} />
			</div>
			<div>
				<h4 className='shipp-info__heading'>Dimensions</h4>
				<div className='shipp-info__truck shipp-info__block'>
					<img
						src={constants.DIMENSIONS_ICON_SRC}
						alt={constants.DIMENSIONS_ICON_ALT_VALUE}
						width='75px'
					/>
					<ShippInfoTable shippInfo={shippInfo} />
				</div>
			</div>
		</div>
	);
};

export default ShippInfo;
