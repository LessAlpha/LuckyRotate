import React from 'react';
// import { CSSTransition } from 'react-transition-group';
import {css, cx} from 'emotion';
import {handlePropagation} from '../../utils';
import { BgOverlay } from '../../style';

const TipLoad = ({msg}) => {

    return (<div className={wrapper} onClick={handlePropagation}>
        <i className={cx('zwicon-rotate-right', cmp_rotate_style, 'rotate')} />
        <p>{msg}</p>
        <div className={BgOverlay}/>
    </div>);
};


export default TipLoad;

// CSS
const cmpRotateSize = 180;

const wrapper = css`// 全屏置顶
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: 10000;
    color: #558FB4;

    p {
        position: absolute;
        top: 40%;
        left: 50%;
        width:${cmpRotateSize-20}px;
        margin-left: ${-(cmpRotateSize-20)/2}px;
        margin-top: -11px;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
    }
`;

const cmp_rotate_style = css`
    position: absolute;
    top: 40%;
    left: 50%;
    width: ${cmpRotateSize}px;
    height: ${cmpRotateSize}px;
    margin: ${-cmpRotateSize/2}px 0 0 ${-cmpRotateSize/2}px;
    // z-index: 1;

    font-size: ${cmpRotateSize}px;//1rem;
    font-weight: 500;
    
    @keyframes rotate {
        from{ transform: rotate(0deg) }
        to{ transform: rotate(359deg) }
    }
    
    &.rotate{
        transform-origin: ${cmpRotateSize/2}px ${cmpRotateSize/2}px;  
        animation: rotate 1s linear infinite;
    }
`;
