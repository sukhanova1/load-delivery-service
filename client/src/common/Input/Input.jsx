import React from 'react';

import './Input.css';

const Input = (props) => {
	return props.type === 'radio' ? (
		<label htmlFor={props.id} className='input_radio'>
			<input id={props.id} {...props} />
			{props.id.toUpperCase()}{' '}
		</label>
	) : (
		<>
			<label htmlFor={props.name}></label>
			<input className='input' id={props.name} {...props} />
		</>
	);
};

export default Input;
