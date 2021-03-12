import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { css } from 'emotion';
import { handlePropagation } from '../../utils';

const TipMsg = ({close, msg}) => {
    const [ani, setAni] = useState(false);
    
    useEffect(()=>{
        // setMsg(msg);
        if(msg!=='') {
            setAni(true);
            setTimeout(()=>{
                setAni(false);
                delayClose();
            }, 2200);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg]);

    const delayClose = ()=> {
        setTimeout(()=>{
            close();
        }, 500);
    }

    return (
        <div className={wrapper} onKeyDown={handlePropagation} >
        <CSSTransition in={ani} timeout={{enter:500, exit:500}} classNames={'float'}>
            <p className={msg_style}>{msg}</p>
        </CSSTransition>
        </div>
    );
};

const wrapper = css`

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9900000;
`;
const msg_style = css`
    position: absolute;
    top: 200px;
    left: 50%;
    width: 700px;
    margin-left: -350px;
    text-align: center;
    font-size: 40px;
    line-height: 1.3;
    font-weight: 800;
    color: #ffffff;//#FF7011;
    z-index: 999999999;

	&.float-enter {
        top: 200px;
	}
	&.float-enter-active {
		top: 6px;
		transition: top 500ms;
	}
	&.float-enter-done {
		top: 6px;
	}
	&.float-exit {
		top: 6px;
        opacity: 1;
	}
	&.float-exit-active {
		top: 6px;
		opacity: 0;
		transition: opacity 500ms;
	}
	&.float-exit-done {
		opacity: 0;
	}
`;

export default TipMsg;