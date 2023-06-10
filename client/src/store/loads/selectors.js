import {
	LOAD_STATUS_ASSIGNED,
	LOAD_STATUS_SHIPPED,
} from '../../utils/constants';

// export const selectLoads = (state) => state.loads;

export const selectActiveLoads = (state) =>
	state.loads.filter((load) => load.status === LOAD_STATUS_ASSIGNED);

export const selectShipedLoads = (state) =>
	state.loads.filter((load) => load.status === LOAD_STATUS_SHIPPED);
