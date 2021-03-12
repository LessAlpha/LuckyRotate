import React, { useRef, useContext, useLayoutEffect } from 'react';
import { css } from 'emotion';
import { context } from '../../../context'
import { setNameList } from '../../../../common/reducer/common/actionCreator'
import { handlePropagation } from '../../../../common/utils';
import {ButtonSet, MainButton, TextareaBtmBorder} from '../../../../common/style';

const Login = ({setTitle, handleClosePopup}) => {
    const { common } = useContext(context);
    const rTextarea = useRef();

	setTitle('设置名单');
	
	useLayoutEffect(() => {
		rTextarea.current.value = common.state.rewardNames.toString()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onClickSure = () => {
		const s = rTextarea.current.value
		// console.log('onClickSure', rTextarea.current.value)
		common.dispatch(setNameList(s))
		handleClosePopup()
	}

    return (<div className={wrapper} onKeyDown={handlePropagation} >
        
		<div className={'clearfix'}>
			<div className={right_inputs_style}>
				<textarea ref={rTextarea} className={TextareaBtmBorder} placeholder="两个名字之间用逗号(,)隔开" spellCheck={false}></textarea>
			</div>
		</div>
        <ButtonSet>
            <MainButton onClick={onClickSure}>{'确 定'}</MainButton>
        </ButtonSet>
    </div>);
};

const wrapper = css`
    padding: 20px 20px 10px;
`;

const right_inputs_style = css`
	// float: left;
	width: 100%;
`;

export default Login;