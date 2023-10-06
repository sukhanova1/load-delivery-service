import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import Error from 'common/Error/Error';
import Notification from 'common/Notification/Notification';
import useInput from 'hooks/useInput';
import { selectLoadItem } from 'store/loads/selectors';
import { addLoadRequest, editLoadRequest } from 'store/loads/actionCreator';
import { selectServerSuccess } from 'store/app/selectors';
import constants from 'utils/constants';

import './LoadsForm.css';

const LoadsForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loadId } = useParams();

	const loadItem = useSelector(selectLoadItem(loadId));
	const serverSuccess = useSelector(selectServerSuccess);

	const name = useInput(loadItem ? loadItem.name : '', {
		isEmpty: true,
		fieldName: 'Name',
		minLength: 2,
		maxLength: 13,
	});

	const pickup_addr = useInput(loadItem ? loadItem.pickup_address : '', {
		isEmpty: true,
	});

	const delivery_addr = useInput(loadItem ? loadItem.delivery_address : '', {
		isEmpty: true,
	});

	const payload = useInput(loadItem ? loadItem.payload : 0, {
		isDimensions: true,
		fieldValue: 4000,
		fieldName: 'Payload',
	});

	const length = useInput(loadItem ? loadItem.dimensions.length : 0, {
		isDimensions: true,
		fieldValue: 700,
		fieldName: 'Length',
	});
	const width = useInput(loadItem ? loadItem.dimensions.width : 0, {
		isDimensions: true,
		fieldValue: 350,
		fieldName: 'Width',
	});

	const height = useInput(loadItem ? loadItem.dimensions.height : 0, {
		isDimensions: true,
		fieldValue: 270,
		fieldName: 'Height',
	});

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const load = {
			name: name.value,
			pickup_address: pickup_addr.value,
			delivery_address: delivery_addr.value,
			payload: +payload.value,
			dimensions: {
				length: +length.value,
				width: +width.value,
				height: +height.value,
			},
		};
		if (!loadId) {
			dispatch(addLoadRequest({ token, load }));
		} else {
			dispatch(editLoadRequest({ token, load, loadId }));
		}
	};

	useEffect(() => {
		if (serverSuccess) {
			navigate(constants.LOADS_ROUTE);
		}
	}, [serverSuccess]);

	// useEffect(() => {
	// 	if (loadId) {
	// 		dispatch(getLoadsRequest(localStorage.getItem('token')));
	// 	}
	// }, [dispatch]);

	return (
		<form className='loads-form' onSubmit={handleSubmitForm}>
			<Link to={constants.LOADS_ROUTE} className='loads-form__link'>
				<img
					src={constants.BACK_ICON_SRC}
					alt={constants.BACK_ICON_ALT_VALUE}
					width='20px'
				/>{' '}
				Back to loads
			</Link>
			<Notification />
			<div className='loads-form__box'>
				<p className='loads-form__label'>Load Name</p>
				<Input
					className='loads-form__input'
					type={constants.INPUT_TEXT}
					name={constants.INPUT_NAME}
					placeholder={constants.INPUT_LOAD_NAME_PLACEHOLDER}
					value={name.value}
					onChange={name.onChange}
					onBlur={name.onBlur}
				/>
				{name.isDirty && name.isEmpty && <Error text={name.isEmpty} />}
				{name.isDirty && name.value && name.minLength && (
					<Error text={name.minLength} />
				)}
				{name.isDirty && name.value && name.maxLength && (
					<Error text={name.maxLength} />
				)}
			</div>
			<div className='loads-form__box'>
				<p className='loads-form__label'>Pick-up Address</p>
				<Input
					className='loads-form__input'
					type={constants.INPUT_TEXT}
					name={constants.INPUT_PICKUP_ADDR}
					placeholder={constants.INPUT_PICKUP_ADDR_PLACEHOLDER}
					value={pickup_addr.value}
					onChange={pickup_addr.onChange}
					onBlur={pickup_addr.onBlur}
				/>
				{pickup_addr.isDirty && pickup_addr.isEmpty && (
					<Error text={pickup_addr.isEmpty} />
				)}
			</div>
			<div className='loads-form__box'>
				<p className='loads-form__label'>Delivery Address</p>
				<Input
					className='loads-form__input'
					type={constants.INPUT_TEXT}
					name={constants.INPUT_DEL_ADDR}
					placeholder={constants.INPUT_DEL_ADDR_PLACEHOLDER}
					value={delivery_addr.value}
					onChange={delivery_addr.onChange}
					onBlur={delivery_addr.onBlur}
				/>
				{delivery_addr.isDirty && delivery_addr.isEmpty && (
					<Error text={delivery_addr.isEmpty} />
				)}
			</div>
			<fieldset className='loads-form__fieldset'>
				<legend className='loads-form__legend'>Load dimensions</legend>
				<div className='loads-form__box'>
					<p className='loads-form__label'>Payload</p>
					<Input
						className='loads-form__input'
						type={constants.INPUT_NUMBER}
						name={constants.INPUT_PAYLOAD}
						value={payload.value}
						onChange={payload.onChange}
						onBlur={payload.onBlur}
					/>
					{payload.isDirty && payload.isDimensions && (
						<Error text={payload.isDimensions} />
					)}
				</div>
				<div className='loads-form__box'>
					<p className='loads-form__label'>Length</p>
					<Input
						className='loads-form__input'
						type={constants.INPUT_NUMBER}
						name={constants.INPUT_LENGTH}
						value={length.value}
						onChange={length.onChange}
						onBlur={length.onBlur}
					/>
					{length.isDirty && length.isDimensions && (
						<Error text={length.isDimensions} />
					)}
				</div>
				<div className='loads-form__box'>
					<p className='loads-form__label'>Width</p>
					<Input
						className='loads-form__input'
						type={constants.INPUT_NUMBER}
						name={constants.INPUT_WIDTH}
						value={width.value}
						onChange={width.onChange}
						onBlur={width.onBlur}
					/>
					{width.isDirty && width.isDimensions && (
						<Error text={width.isDimensions} />
					)}
				</div>
				<div className='loads-form__box'>
					<p className='loads-form__label'>Height</p>
					<Input
						className='loads-form__input'
						type={constants.INPUT_NUMBER}
						name={constants.INPUT_HEIGHT}
						value={height.value}
						onChange={height.onChange}
						onBlur={height.onBlur}
					/>
					{height.isDirty && height.isDimensions && (
						<Error text={height.isDimensions} />
					)}
				</div>
			</fieldset>
			<Button
				disabled={
					!name.isValidField ||
					!pickup_addr.isValidField ||
					!delivery_addr.isValidField ||
					!payload.isValidField ||
					!width.isValidField ||
					!length.isValidField ||
					!height.isValidField
				}
				type={constants.BUTTON_TYPE_SUBMIT}
				text={
					loadItem ? constants.BUTTON_TEXT_UPDATE : constants.BUTTON_TEXT_ADD
				}
				className='loads-form__btn'
			/>
		</form>
	);
};

export default LoadsForm;
