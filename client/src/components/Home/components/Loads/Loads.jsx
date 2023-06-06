import React from 'react';

import './Loads.css';

const Loads = () => {
	return (
		<div className='loads'>
			<div className='loads__container'>
				<h2 className='loads__title'>Active</h2>
			</div>
			<div className='loads__container'>
				<h2 className='loads__title'>Completed</h2>
			</div>
		</div>
	);
};

export default Loads;
