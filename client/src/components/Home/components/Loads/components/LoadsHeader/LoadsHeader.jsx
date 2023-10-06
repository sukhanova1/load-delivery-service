import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button/Button';
import Select from 'common/Select/Select';
import constants from 'utils/constants';

import './LoadsHeader.css';

const LoadsHeader = ({ loads, setFilteredLoads, setLoadType }) => {
	const navigate = useNavigate();
	const handleSelectChange = (value) => {
		switch (value) {
			case constants.SELECT_ALL_LOADS:
				setFilteredLoads(loads);
				break;
			case constants.LOAD_STATUS_NEW:
				const newLoads = loads.filter(
					(load) => load.status === constants.LOAD_STATUS_NEW
				);
				setFilteredLoads(newLoads);
				setLoadType('new');
				break;
			case constants.LOAD_STATUS_ASSIGNED:
				const assignedLoads = loads.filter(
					(load) => load.status === constants.LOAD_STATUS_ASSIGNED
				);
				setFilteredLoads(assignedLoads);
				setLoadType('assigned');
				break;
			case constants.LOAD_STATUS_SHIPPED:
				const shippedLoads = loads.filter(
					(load) => load.status === constants.LOAD_STATUS_SHIPPED
				);
				setFilteredLoads(shippedLoads);
				setLoadType('shipped');
				break;
			default:
				setFilteredLoads(loads);
		}
	};
	const handleAddNewLoad = () => navigate('add');

	return (
		<div className='loads__header'>
			<Button
				className='loads__btn'
				type={constants.BUTTON_TYPE_BUTTON}
				text={constants.BUTTON_TEXT_ADD_LOAD}
				onClick={handleAddNewLoad}
			/>
			<Select
				id={constants.SELECT_ID_LOAD_STATUS}
				options={constants.SELECT_LOAD_OPTIONS}
				handleSelectChange={handleSelectChange}
				defaultValue={constants.SELECT_LOAD_DEFAULT_VALUE}
			/>
		</div>
	);
};

export default LoadsHeader;
