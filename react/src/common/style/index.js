import React from 'react';
import {css} from 'emotion';

export const noWrapTxt = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // width: xx;
`;

export const TitleBannerOfPop = css`
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 12px 12px 0 0;
    background: #333333;
    color: #eeeeee;
`;

export const BtnClosePop = css`
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 35px;
    font-weight: 600;
    color: #cccccc;
    &:active {
        transform: scale(0.95)
    }
`;

export const BgOverlay = css`
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;

    background: #000000;
    opacity: 0.05;
`;

export const InputBtmBorder = css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 38px;
    margin: 0 auto 12px;
    padding: 6px 6px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    
    background-color: transparent;
    background-clip: padding-box;
    border: none;
    outline: none;
    border-bottom: 2px solid #558FB4;
`;



export const LabelBtmBorder = css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 38px;
    margin: 0 auto 12px;
    // padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    text-align: right;
    
    color: #558FB4;
`;

export const TextareaBtmBorder = css`
	${InputBtmBorder}
    resize: none;
    height: 150px;
`;

export const ButtonSet = props => (<div {...props} className={css`
    display: flex;
    justify-content: center;
    // margin-top: 10px;

    button {
        margin: 10px;
        padding: 10px 20px;
        background-color: #ffffff;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
    }

    button:active {
        transform: scale(0.95);
    }
    button:disabled {
        cursor: not-allowed !important;
    }
`} />);

export const MainButton = props => (<button {...props} className={css` /* button& 用于提高 CSS 权重 */
button& {
    color: #ffffff;
    background-color: #434343;
    border: 1px solid #555555;
    cursor: pointer;
}
`} />);

export const Highlight = props => (<p {...props} className={css`
    margin-top: 0;
    color: #558FB4;
    font-weight: 700;
`} />);

export const Annotation = props => (<p {...props} className={css`
    color: #888888;
    font-size: 90%;
`} />);

// eslint-disable-next-line jsx-a11y/anchor-has-content
export const Shortcut = props => (<a {...props} className={css`
    text-decoration: underline;
    cursor: pointer;
`} />);