import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadItem from '../Loads/components/LoadItem';
import Button from '../../../../common/Button/Button';
import Modal from '../../../../common/Modal/Modal';
import Select from '../../../../common/Select/Select';
import {
	getActiveLoadsRequest,
	getLoadsRequest,
} from '../../../../store/loads/actionCreator';
import {
	selectActiveLoads,
	selectLoads,
	selectShipedLoads,
} from '../../../../store/loads/selectors';
import { selectUserRole } from '../../../../store/user/selectors';
import {
	selectModalError,
	selectModalSuccess,
} from '../../../../store/app/selectors';
import {
	BUTTON_TEXT_ADD_LOAD,
	BUTTON_TYPE_BUTTON,
	DRIVER_ROLE,
	MODAL_TYPE_ERROR,
	MODAL_TYPE_SUCCESS,
	SELECT_ID_LOAD_STATUS,
	SELECT_LOAD_DEFAULT_VALUE,
	SELECT_LOAD_OPTIONS,
	SHIPPER_ROLE,
	SELECT_ALL_LOADS,
	LOAD_STATUS_NEW,
	LOAD_STATUS_ASSIGNED,
	LOAD_STATUS_SHIPPED,
} from '../../../../utils/constants';

import './Loads.css';

const Loads = () => {
	const userRole = useSelector(selectUserRole);
	const loads = useSelector(selectLoads);
	const activeLoads = useSelector(selectActiveLoads);
	const shippedLoads = useSelector(selectShipedLoads);
	const serverError = useSelector(selectModalError);
	const serverSuccess = useSelector(selectModalSuccess);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [filteredLoads, setFilteredLoads] = useState(useSelector(selectLoads));
	const [loadType, setLoadType] = useState('');

	const handleSelectChange = (value) => {
		switch (value) {
			case SELECT_ALL_LOADS:
				setFilteredLoads(loads);
				break;
			case LOAD_STATUS_NEW:
				const newLoads = loads.filter(
					(load) => load.status === LOAD_STATUS_NEW
				);
				setFilteredLoads(newLoads);
				setLoadType('new');
				break;
			case LOAD_STATUS_ASSIGNED:
				const assignedLoads = loads.filter(
					(load) => load.status === LOAD_STATUS_ASSIGNED
				);
				setFilteredLoads(assignedLoads);
				setLoadType('assigned');
				break;
			case LOAD_STATUS_SHIPPED:
				const shippedLoads = loads.filter(
					(load) => load.status === LOAD_STATUS_SHIPPED
				);
				setFilteredLoads(shippedLoads);
				setLoadType('shipped');
				break;
			default:
				setFilteredLoads(loads);
		}
	};
	const handleAddNewLoad = () => navigate('add');

	useEffect(() => setFilteredLoads(loads), [loads]);

	useEffect(() => {
		if (userRole === DRIVER_ROLE) {
			dispatch(getActiveLoadsRequest(localStorage.getItem('token')));
		}
		if (userRole === SHIPPER_ROLE) {
			dispatch(getLoadsRequest(localStorage.getItem('token')));
		}
	}, [dispatch]);

	return (
		<div className='loads'>
			{serverSuccess && (
				<Modal type={MODAL_TYPE_SUCCESS} text={serverSuccess} />
			)}
			{serverError && <Modal type={MODAL_TYPE_ERROR} text={serverError} />}
			{userRole === SHIPPER_ROLE && (
				<div className='loads__container'>
					<div className='loads__header'>
						<Button
							className='loads__btn'
							type={BUTTON_TYPE_BUTTON}
							text={BUTTON_TEXT_ADD_LOAD}
							onClick={handleAddNewLoad}
						/>
						<Select
							id={SELECT_ID_LOAD_STATUS}
							options={SELECT_LOAD_OPTIONS}
							handleSelectChange={handleSelectChange}
							defaultValue={SELECT_LOAD_DEFAULT_VALUE}
						/>
					</div>

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
			{userRole === DRIVER_ROLE && (
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
