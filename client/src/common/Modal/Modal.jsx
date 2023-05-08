import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	selectModalSuccess,
	selectModalError,
} from '../../store/app/selectors';
import { closeModal } from '../../store/app/actionCreator';
import {
	CHECK_MARK_ALT_VALUE,
	CHECK_MARK_SRC,
	ERROR_ICON_ALT_VALUE,
	ERROR_ICON_SRC,
} from '../../utils/constants';

import './Modal.css';

const Modal = ({ type, text }) => {
	const modalSucess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	const dispatch = useDispatch();

	useEffect(() => {
		if (modalSucess || modalError) {
			setTimeout(() => {
				dispatch(closeModal());
			}, 3000);
		}
	}, [modalSucess, modalError]);

	return (
		<div className='modal'>
			<div className='modal__content'>
				{type === 'success' && (
					<img src={CHECK_MARK_SRC} alt={CHECK_MARK_ALT_VALUE} width='60px' />
				)}
				{type === 'error' && (
					<img src={ERROR_ICON_SRC} alt={ERROR_ICON_ALT_VALUE} width='45px' />
				)}
				<p className='modal__text'>{text}</p>
			</div>
		</div>
	);
};

export default Modal;
