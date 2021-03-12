import React from 'react';
import {css, cx} from 'emotion';
import '../../../common/statics/zwicon.css';
import { ThemeCommon } from '../../../common/conf/ref';
import {handlePropagation, handlePrevDefault} from '../../utils'; // 用于禁用按钮点击。如果使用 button 的 disable 属性实现，会由于点击事件冒泡导致 Toolbar 被隐藏
import { IsPC } from '../../utils';

const isPc = IsPC();

const ToolButton = ({icon, onClick, children, disabled, selected, disableHover}) => {//, onEnter, onLeave  onMouseEnter={onEnter?onEnter:null} onMouseLeave={onLeave?onLeave:null}
    return (<button onClick={disabled ? handlePropagation : onClick}  onKeyDown={handlePrevDefault}
                className={cx(wrapper, {[disabled_style]: disabled}, {[selected_style]:selected}, {'highlightHover':isPc&&!disabled&&!disableHover})}>
            <i className={'zwicon-' + icon} />
            <span>{children}</span>
        </button>);
};

export default ToolButton;

// CSS
const wrapper = css`
    display: block;
    margin: 0 auto;
    padding: 0 0.18em;
    background-color: transparent;
    border: none !important;
    outline: none !important;
    cursor: pointer;
    color: var(${ThemeCommon.ICON_TXT_NORMAL});

    i {
        display: inline-block;
        // margin-bottom: 0.12em;
        font-size: 100%;
    }
    span {
        display: inline-block;
        font-size: 70%;
        // margin-top: 10%;
    }

    &:active {
        transform: scale(0.9);
    }

    &.highlightHover:hover {
        color: #BB7000;
    }
`;

const selected_style = css`
    color: #BB7000 !important;
`

const disabled_style = css`
    &, &:hover {
        color: #cccccc;
    }

    cursor: not-allowed !important;
`;