import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTrucksRequest } from '../../../../store/trucks/actionCreator';

const Trucks = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTrucksRequest(localStorage.getItem('token')));
	}, [dispatch]);

	return <div>Trucks</div>;
};

export default Trucks;
