import React from 'react';
import {css, cx} from 'emotion';
import '../../../common/statics/zwicon.css';
import { ThemeCommon } from '../../conf/ref';
import {handlePropagation, handlePrevDefault} from '../../utils'; // 用于禁用按钮点击。如果使用 button 的 disable 属性实现，会由于点击事件冒泡导致 Toolbar 被隐藏
import { IsPC } from '../../utils';

const isPc = IsPC();

const ToolIcon = ({icon, onClick, children, disabled, disableHover, selected, clsStyle, propsIcon, normalTip='', hoverTip=''}) => {
    return (<button onClick={!disabled && onClick ? onClick : handlePropagation} {...propsIcon} onKeyDown={handlePrevDefault} disabled={disabled}
                className={cx(wrapper, {'selected':selected}, {'hover':isPc&&!disabled&&!disableHover}, clsStyle)}>
            <i className={'zwicon-' + icon} />
            <span>{children}</span>

			{normalTip!=='' && normalTip!==0 && <div className={'normal-tip'}>{normalTip}</div>}
			{hoverTip!=='' && <div className={'hover-tip'}>{hoverTip}</div>}
        </button>);
}

export default ToolIcon

// 外部自定义：状态颜色，整体尺寸大小，内外边距

// CSS
const wrapper = css`
	position: relative;
    padding: 0.15em 0.1em;
    // width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    border: none !important;
    outline: none !important;
    cursor: pointer;
	color: var(${ThemeCommon.ICON_TXT_NORMAL});
	text-align: center;
	-webkit-tap-highlight-color: transparent;

    & > i {
        display: block;
        margin-bottom: 0.04em;
    }
    & > span {
        display: block;
        font-size: 0.3em;
    }

    &.hover:hover {
		color: var(${ThemeCommon.ICON_TXT_HOVER});
		border-color: var(${ThemeCommon.ICON_TXT_HOVER});
    }

	&.selected {
		color: var(${ThemeCommon.ICON_TXT_SELECTED}) !important;
		border-color: var(${ThemeCommon.ICON_TXT_SELECTED}) !important;
	}

	&:disabled {
		&, &:hover {
			color: var(${ThemeCommon.ICON_TXT_DISABLED});
		}
		cursor: not-allowed !important;
	}

	& > .hover-tip {
		display: none;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%, 0);
		margin: 0 auto;
		padding: 2px;
		width: max-content;
		color: var(${ThemeCommon.ICON_TIP_HOVER_TXT});
		background: var(${ThemeCommon.ICON_TIP_HOVER_BG});
		border-radius: 5px;
		font-size: 0.4em;
	}

	& > .normal-tip {
		position: absolute;
		right: 1em;
		// bottom: 1.6em;
		top: 10%;
		color: var(${ThemeCommon.ICON_TIP_NORMAL_TXT});
		background: var(${ThemeCommon.ICON_TIP_NORMAL_BG});
		border-radius: 4px;
		padding: 2px;
		font-size: 0.3em;
		color: white;
	}


	&:active {
		i, span, .normal-tip {
			transform: scale(0.9);
		}
	}

	&:hover {
		z-index: 100;// 提升层次防止提示信息被遮
		& > .hover-tip {
			display:block;
		}
	}
`