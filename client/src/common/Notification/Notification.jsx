import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectServerSuccess, selectServerError } from 'store/app/selectors';
import { closeModal } from 'store/app/actionCreator';
import constants from 'utils/constants';

import './Notification.css';

const Notification = ({ type, text }) => {
	const modalSuccess = useSelector(selectServerSuccess);
	const modalError = useSelector(selectServerError);

	const dispatch = useDispatch();

	useEffect(() => {
		if (modalSuccess || modalError) {
			setTimeout(() => {
				dispatch(closeModal());
			}, 3000);
		}
	}, [modalSuccess, modalError]);

	return modalSuccess || modalError ? (
		<div className='modal'>
			<div className='modal__content'>
				{modalSuccess && (
					<img
						src={constants.CHECK_MARK_SRC}
						alt={constants.CHECK_MARK_ALT_VALUE}
						width='60px'
					/>
				)}
				{modalError && (
					<img
						src={constants.ERROR_ICON_SRC}
						alt={constants.ERROR_ICON_ALT_VALUE}
						width='45px'
					/>
				)}
				<p className='modal__text'>
					{modalSuccess ? modalSuccess : modalError}
				</p>
			</div>
		</div>
	) : null;
};

export default Notification;
