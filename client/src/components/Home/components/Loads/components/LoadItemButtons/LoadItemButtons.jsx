import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common/Button/Button';
import { deleteLoadRequest, postLoadRequest } from 'store/loads/actionCreator';
import constants from 'utils/constants';

import './LoadItemButtons.css';

const LoadItemButtons = ({ load }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleEditLoad = () => navigate(`update/${load._id}`);

	const handleDeleteLoad = () => {
		const data = { token: localStorage.getItem('token'), id: load._id };
		dispatch(deleteLoadRequest(data));
	};

	const handlePostLoad = () => {
		const data = { token: localStorage.getItem('token'), id: load._id };
		dispatch(postLoadRequest(data));
	};

	return (
		<div className='load-item__btns-box'>
			<Button
				className='load-item__img-btn'
				type={constants.BUTTON_TYPE_BUTTON}
				text={
					<img
						src={constants.EDIT_ICON_SRC}
						alt={constants.EDIT_ICON_ALT_VALUE}
						width='20px'
					/>
				}
				onClick={handleEditLoad}
			/>
			<Button
				className='load-item__img-btn'
				type={constants.BUTTON_TYPE_BUTTON}
				text={
					<img
						src={constants.DELETE_ICON_SRC}
						alt={constants.DELETE_ICON_ALT_VALUE}
						width='20px'
					/>
				}
				onClick={handleDeleteLoad}
			/>
			<Button
				className='load-item__btn'
				type={constants.BUTTON_TYPE_BUTTON}
				text={constants.BUTTON_TEXT_POST}
				onClick={handlePostLoad}
			/>
		</div>
	);
};

export default LoadItemButtons;
