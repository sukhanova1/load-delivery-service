import React from 'react';

import constants from 'utils/constants';

const TruckImage = ({ type, sprinterWidth, smallStWidth, largeStWidth }) => (
	<>
		{type === constants.SPRINTER_TYPE && (
			<img
				src={constants.SPRINTER_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width={sprinterWidth}
			/>
		)}
		{type === constants.SMALL_STRAIGHT_TYPE && (
			<img
				src={constants.SMALL_STRAIGHT_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width={smallStWidth}
			/>
		)}
		{type === constants.LARGE_STRAIGHT_TYPE && (
			<img
				src={constants.LARGE_STRAIGHT_SRC}
				alt={constants.TRUCKS_ALT_VALUE}
				width={largeStWidth}
			/>
		)}
	</>
);

export default TruckImage;
