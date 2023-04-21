import React from 'react';

import { CHECK_MARK_ALT_VALUE, CHECK_MARK_SRC } from '../../utils/constants';

import './Modal.css';

function Modal({ type, text }) {
	return (
		<div className='modal'>
			<div className='modal__content'>
				{type === 'success' && (
					<img src={CHECK_MARK_SRC} alt={CHECK_MARK_ALT_VALUE} width='60px' />
				)}
				<p className='modal__text'>{text}</p>
			</div>
		</div>
	);
}

export default Modal;
