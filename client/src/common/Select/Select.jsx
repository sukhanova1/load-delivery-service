import React from 'react';

import './Select.css';

const Select = ({ id, options, handleSelectChange, defaultValue }) => {
	const handleChange = (e) => handleSelectChange(e.target.value);

	return (
		<>
			<label htmlFor={id}></label>
			<select
				id={id}
				name={id}
				className='select'
				onChange={handleChange}
				defaultValue={defaultValue}
			>
				<option value={defaultValue} disabled>
					{defaultValue}
				</option>
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
