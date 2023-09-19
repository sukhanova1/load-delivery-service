import React from 'react';
import constants from 'utils/constants';

const Logo = (props) => (
	<img src={constants.LOGO_SRC} alt={constants.LOGO_ALT_VALUE} {...props} />
);

export default Logo;
