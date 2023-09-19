import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectModalSuccess, selectModalError } from 'store/app/selectors';
import { closeModal } from 'store/app/actionCreator';
import constants from 'utils/constants';

import './Modal.css';

const Modal = ({ type, text }) => {
	const modalSuccess = useSelector(selectModalSuccess);
	const modalError = useSelector(selectModalError);

	const dispatch = useDispatch();

	useEffect(() => {
		if (modalSuccess || modalError) {
			setTimeout(() => {
				dispatch(closeModal());
			}, 3000);
		}
	}, [modalSuccess, modalError]);

	return (
		<div className='modal'>
			<div className='modal__content'>
				{type === constants.MODAL_TYPE_SUCCESS && (
					<img
						src={constants.CHECK_MARK_SRC}
						alt={constants.CHECK_MARK_ALT_VALUE}
						width='60px'
					/>
				)}
				{type === constants.MODAL_TYPE_ERROR && (
					<img
						src={constants.ERROR_ICON_SRC}
						alt={constants.ERROR_ICON_ALT_VALUE}
						width='45px'
					/>
				)}
				<p className='modal__text'>{text}</p>
			</div>
		</div>
	);
};

export default Modal;
