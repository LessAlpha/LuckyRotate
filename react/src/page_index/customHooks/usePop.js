import {useContext} from 'react';
import {context} from '../context';
import * as popAction from '../../common/reducer/pop/actionCreator';
import { PopupTypes } from '../../common/conf/ref';

const usePop = () => {
    const { pop } = useContext(context);

    const showPop = (type, props) => {
        pop.dispatch(popAction.showPop(type, props));
    }

    return {
        show: (type, props) => {
            showPop(type, props);
        },
        hide: () => {
            pop.dispatch(popAction.hidePop());
        },

        showLogin: () => {
            showPop(PopupTypes.LOGIN);
        },

        showLoad: (msg) => {
            pop.dispatch(popAction.toggleLoad(true, msg));
        },
        hideLoad: () => {
            pop.dispatch(popAction.toggleLoad(false, ''));
        },
        pushTipFlash: (msg) => {
            pop.dispatch(popAction.pushTipFlash(msg));
        },
        shiftTipFlash: () => {
            pop.dispatch(popAction.shiftTipFlash());
        },
        pushTipAlert: (msg) => {
            pop.dispatch(popAction.pushTipAlert(msg));
        },
        shiftTipAlert: () => {
            pop.dispatch(popAction.shiftTipAlert());
        },
    }
};

export default usePop;