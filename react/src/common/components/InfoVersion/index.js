import React from 'react';
import {css} from 'emotion';
import { Version } from '../../conf';
export default () => {
    return (<div className={wrapper}>
        <span>{Version}</span>
    </div>);
};

const wrapper = css`
    position: absolute;
    bottom: 4px;
    right: 6px;
    z-index: 100;
    color: gray;
    font-size: 10px;
`;
