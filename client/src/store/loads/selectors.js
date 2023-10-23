import constants from '../../utils/constants';

export const selectLoads = (state) => state.loads.loads;

export const selectShippInfo = (state) => state.loads.shipp_info;

export const selectLoadItem = (id) => (state) =>
	state.loads.loads.filter((load) => load._id === id)[0];

export const selectActiveLoads = (state) =>
	state.loads.loads.filter(
		(load) => load.status === constants.LOAD_STATUS_ASSIGNED
	);

export const selectShippedLoads = (state) =>
	state.loads.loads.filter(
		(load) => load.status === constants.LOAD_STATUS_SHIPPED
	);
