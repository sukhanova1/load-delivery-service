import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadItem from './components/LoadItem/LoadItem';
import LoadsHeader from './components/LoadsHeader/LoadsHeader';
import Modal from 'common/Modal/Modal';
import {
	getActiveLoadsRequest,
	getLoadsRequest,
} from 'store/loads/actionCreator';
import {
	selectActiveLoads,
	selectLoads,
	selectShippedLoads,
} from 'store/loads/selectors';
import { selectUserRole } from 'store/user/selectors';
import { selectModalError, selectModalSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import './Loads.css';

const Loads = () => {
	const userRole = useSelector(selectUserRole);
	const loads = useSelector(selectLoads);
	const activeLoads = useSelector(selectActiveLoads);
	const shippedLoads = useSelector(selectShippedLoads);
	const serverError = useSelector(selectModalError);
	const serverSuccess = useSelector(selectModalSuccess);

	const dispatch = useDispatch();

	const [filteredLoads, setFilteredLoads] = useState(useSelector(selectLoads));
	const [loadType, setLoadType] = useState('');

	useEffect(() => setFilteredLoads(loads), [loads]);

	useEffect(() => {
		if (userRole === constants.DRIVER_ROLE) {
			dispatch(getActiveLoadsRequest(localStorage.getItem('token')));
		}
		if (userRole === constants.SHIPPER_ROLE) {
			dispatch(getLoadsRequest(localStorage.getItem('token')));
		}
	}, [dispatch]);

	return (
		<div className='loads'>
			{serverSuccess && (
				<Modal type={constants.MODAL_TYPE_SUCCESS} text={serverSuccess} />
			)}
			{serverError && (
				<Modal type={constants.MODAL_TYPE_ERROR} text={serverError} />
			)}
			{userRole === constants.SHIPPER_ROLE && (
				<div className='loads__container'>
					<LoadsHeader
						loads={loads}
						setFilteredLoads={setFilteredLoads}
						setLoadType={setLoadType}
					/>
					{filteredLoads.length === 0 && (
						<p className='loads__mess'>
							You do not have any {loadType} loads...
						</p>
					)}
					{filteredLoads &&
						filteredLoads.map((load) => (
							<LoadItem key={load._id} load={load} />
						))}
				</div>
			)}
			{userRole === constants.DRIVER_ROLE && (
				<>
					<div className='loads__container'>
						<h2 className='loads__title'>Active</h2>
						{activeLoads.length === 0 && (
							<p className='loads__mess'>You do not have any active loads...</p>
						)}
						{activeLoads &&
							activeLoads.map((load) => (
								<LoadItem key={load._id} load={load} />
							))}
					</div>
					<div className='loads__container'>
						<h2 className='loads__title'>Shipped</h2>
						{shippedLoads.length === 0 && (
							<p className='loads__mess'>
								You do not have any shipped loads...
							</p>
						)}
						{shippedLoads &&
							shippedLoads.map((load) => (
								<LoadItem key={load._id} load={load} />
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Loads;
