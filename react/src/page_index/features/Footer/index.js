import React from 'react';
import { css } from 'emotion';
import { ThemeCommon } from '../../../common/conf/ref';
// import { handlePropagation } from '../../../common/utils';
export default () => {
    
	return (<div className={wrapper}>
	</div>);
};

// CSS
const wrapper = css`
height: 56px;
padding: 0 10px;
font-size: 25px;
background-color: var(${ThemeCommon.BG});
`;
