import React, {Suspense, useState, useContext} from 'react';
import { CSSTransition } from 'react-transition-group';
import {css, cx} from 'emotion';
import {context} from '../../context';
import { PopupTypes } from '../../../common/conf/ref';
import usePop from '../../customHooks/usePop';
import {handlePropagation} from '../../../common/utils';
import { TitleBannerOfPop, BtnClosePop, BgOverlay } from '../../../common/style';
// import New from './subComponents/New';
// import Open from './subComponents/Open';
// import Theme from './subComponents/Theme';
import Login from './content/Login';

const getContentComponent = type => {
    switch (type) {
        // case PopupTypes.NEW:
        //     return lazy(() => import('./content/New'));
        // case PopupTypes.OPEN:
        //     return lazy(() => import('./content/Open'));
        // case PopupTypes.EXPORT:
        //     return lazy(() => import('./content/Export'));
        // case PopupTypes.THEME:
        //     return lazy(() => import('./content/Theme'));
        // case PopupTypes.SET_PUBLIC:
        //     return lazy(() => import('./content/SetPublic'));
        // case PopupTypes.TIP_LOCK_CHILDREN:
        //     return lazy(() => import('./content/LockChildren'));
        case PopupTypes.LOGIN:
            return Login;// lazy(() => import('./subComponents/Login'));
        default:
            return;
    }
};

const Popup = ({type, props}) => {
    const { global } = useContext(context);
    const popHook = usePop();

    const [title, setTitle] = useState('');
    const [btnClose, setBtnClose] = useState(true);
    const [closeByOverlay, setCloseBgOverlay] = useState(false);

    const Content = getContentComponent(type);

    const handleClosePopup = ()=> {
        popHook.hide();
    }

    const handleClickOverlay = ()=> {
        if(closeByOverlay) {
            handleClosePopup();
        }
    }

    return (<div className={wrapper} onClick={handlePropagation}>
        <CSSTransition in={title!==''} timeout={500} classNames={'popup'}>
        <div className={content_wrapper}>
            <p className={TitleBannerOfPop}>{title}</p>
            { btnClose && <i className={cx('zwicon-close-circle', BtnClosePop)} onClick={handleClosePopup} />}
            <Suspense fallback={<div>Loading...</div>}>
                <Content props={props} global={global} setTitle={setTitle} setBtnClose={setBtnClose} setCloseBgOverlay={setCloseBgOverlay} handleClosePopup={handleClosePopup} />
            </Suspense>
        </div>

        </CSSTransition>
        <div className={BgOverlay} onClick={handleClickOverlay} />
    </div>);
};


export default Popup;

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
    z-index: 1;

    font-size: 1rem;
    background-color: #FCF6E0;
    border-radius: 12px 12px 0 0;

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
