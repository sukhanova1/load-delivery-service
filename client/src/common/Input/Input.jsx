import React from 'react';

import './Input.css';

const Input = (props) =>
	props.type === 'radio' ? (
		<label htmlFor={props.id} className='input_radio'>
			<input id={props.id} {...props} />
			{props.id.toUpperCase()}{' '}
		</label>
	) : (
		<>
			<label htmlFor={props.name}></label>
			<input
				{...props}
				className={!props.className ? `input` : `input ${props.className}`}
				id={props.name}
			/>
		</>
	);

export default Input;
