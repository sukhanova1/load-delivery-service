import React from 'react';

import './Button.css';

const Button = ({ disabled, type, className, text, onClick }) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={className ? `${className} button` : 'button'}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
