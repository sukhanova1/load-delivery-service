import { useState } from 'react';

import useValidate from './useValidate';

const useInput = (initValue, validations) => {
	const [value, setValue] = useState(initValue);
	const [isDirty, setIsDirty] = useState(false);

	const valid = useValidate(value, validations);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		setIsDirty(true);
	};

	return { value, isDirty, onChange, onBlur, ...valid };
};

export default useInput;
