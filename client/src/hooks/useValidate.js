import { useEffect, useState } from 'react';

const useValidate = (value, validations) => {
	const [isEmpty, setIsEmpty] = useState('');
	const [minLength, setMinLength] = useState('');
	const [maxLength, setMaxLenngth] = useState('');
	const [isEmail, setIsEmail] = useState('');
	const [isPassword, setIsPassword] = useState('');
	const [isValidField, setIsValidField] = useState(false);

	useEffect(() => {
		for (const elem in validations) {
			switch (elem) {
				case 'isEmpty':
					value ? setIsEmpty('') : setIsEmpty('Please fill in the field');
					break;
				case 'minLength':
					value.length < validations[elem]
						? setMinLength(
								`${validations.fieldName} length must be more than ${validations[elem]} characters`
						  )
						: setMinLength('');
					break;
				case 'maxLength':
					value.length > validations[elem]
						? setMaxLenngth(
								`${validations.fieldName} length must be less than ${validations[elem]} characters`
						  )
						: setMaxLenngth('');
					break;
				case 'isEmail':
					const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
					email.test(String(value).toLowerCase())
						? setIsEmail('')
						: setIsEmail('Email address is invalid');
					break;
				case 'isPassword':
					const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
					pass.test(String(value))
						? setIsPassword('')
						: setIsPassword(
								'Password length must be minimum 8 characters and must contain at least 1 letter and 1 number'
						  );
					break;
				default:
			}
		}
	}, [value]);

	useEffect(() => {
		if (isEmpty || isEmail || isPassword || minLength || maxLength) {
			setIsValidField(false);
		} else {
			setIsValidField(true);
		}
	}, [isEmpty, isEmail, isPassword, minLength, maxLength]);

	return { isEmpty, minLength, maxLength, isEmail, isPassword, isValidField };
};

export default useValidate;
