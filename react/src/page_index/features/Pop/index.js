/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { css } from 'emotion';
import { context } from '../../context';
import usePop from '../../customHooks/usePop';
import { PopupTypes } from '../../../common/conf/ref';
import Popup from '../../components/Popup';
import TipLoad from '../../../common/components/TipLoad';
import TipFlash from '../../../common/components/TipFlash';
import TipAlert from '../../../common/components/TipAlert';

const Pop = () => {

	const { pop:{state:pState} } = useContext(context);
	const popHook = usePop();

	const [flash, setFlash] = useState('');
	const [alert, setAlert] = useState('');

	useEffect(()=>{
		const s = pState.arrTipFlash.length;
		if(s>0 && flash==='') {
			setFlash(pState.arrTipFlash[s-1]);
		}
	}, [pState.arrTipFlash]);

	useEffect(()=>{
		const s = pState.arrTipAlert.length;
		if(s>0 && alert==='') {
			setAlert(pState.arrTipAlert[s-1]);
		}
	}, [pState.arrTipAlert]);

	const closeTipFlash = ()=> {
		setFlash('');
		popHook.shiftTipFlash();
	}

	const closeTipAlert = ()=> {
		setAlert('');
		popHook.shiftTipAlert();
	}
	
	return (<div className={wrapper}>
		{ pState.typePop !== PopupTypes.NONE && <Popup type={pState.typePop} props={pState.propsPop} />}
		{ pState.load && <TipLoad msg={pState.msgLoad} /> }

		{ alert!=='' && <TipAlert close={closeTipAlert} msg={alert} />}
		<TipFlash close={closeTipFlash} msg={flash} />
	</div>);
};

export default Pop;

const wrapper = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	font-size: 25px;
	z-index: 9000000;
`;