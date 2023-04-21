import React from 'react';
import { LOGO_ALT_VALUE, LOGO_SRC } from '../../utils/constants';

const Logo = (props) => {
	return <img src={LOGO_SRC} alt={LOGO_ALT_VALUE} {...props} />;
};

export default Logo;
