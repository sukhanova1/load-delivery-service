import React from 'react';

import './Select.css';

const Select = ({ id, options, setTruckType }) => {
	const handleChange = (e) => setTruckType(e.target.value);

	return (
		<>
			<label htmlFor={id}></label>
			<select id={id} name={id} className='select' onChange={handleChange}>
				{options.map((value) => (
					<option value={value} key={value}>
						{value}
					</option>
				))}
			</select>
		</>
	);
};

export default Select;
