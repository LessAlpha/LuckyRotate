import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { css } from 'emotion';
import { handlePropagation } from '../../utils';
import {ButtonSet, MainButton, TitleBannerOfPop, BgOverlay} from '../../style';

const TipAlert = ({msg, close}) => {

    // setCloseBgOverlay(true);

    const [title, setTitle] = useState('');
    // setTitle(msg);
    useEffect(()=>{
        setTitle(msg);
    }, [msg]);

    return (<div className={wrapper} onKeyDown={handlePropagation} >
        
        <CSSTransition in={title!==''} timeout={500} classNames={'popup'}>
        <div className={content_wrapper}>
            <p className={TitleBannerOfPop}>提示</p>
            <p className={tip_style}>{msg}</p>
            <ButtonSet>
                <MainButton onClick={close}>OK</MainButton>
            </ButtonSet>
        </div>
        </CSSTransition>
        <div className={BgOverlay} onClick={close} />
    </div>);
};

// CSS
const wrapper = css`// 全屏置顶
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: 9000;
`;

const content_wrapper = css`
    position: absolute;
    top:20%;
    left:0;
    right:0;
    width: 400px;
    margin: auto;
    padding: 0 0 20px;
    z-index: 1;

    font-size: 1rem;
    background-color: #FCF6E0;
    border-radius: 12px 12px 0 0;

    button {
        margin:0 !important;
        padding: 10px 30px !important;
    }

	@media screen and (max-width:759px) {
        width: 350px;
    }

	@media screen and (max-height:500px) {
        top: 10%;
    }
    
    opacity: 0;
	// &.popup-enter {
	// 	opacity: 0;
	// }
	&.popup-enter-active {
		opacity: 1;
		transition: opacity 500ms;
	}
	&.popup-enter-done {
		opacity: 1;
	}
	&.popup-exit {
		opacity: 1;
	}
	&.popup-exit-active {
		opacity: 0;
		transition: opacity 500ms;
	}
`;


const tip_style = css`
    padding: 30px 10px;
    text-align: center;
    font-size: 20px;
    line-height: 1.3;
    color: #558FB4;
`;

export default TipAlert;