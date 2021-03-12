import * as actionTypes from './actionTypes';
import { PopupTypes } from '../../conf/ref';
import {deepCopy} from '../../utils';

export const defaultValue_pop = {
    typePop: PopupTypes.NONE,
    propsPop: {},

    load: false,
    msgLoad: '',

    arrTipFlash: [],
    arrTipAlert: [],

};

export default (pop, action) => {
    switch (action.type) {
        case actionTypes.SHOW: {
            const popNew = deepCopy(pop);
            Object.assign(popNew, action.data);
            return popNew;
        }
        case actionTypes.HIDE: {
            const popNew = deepCopy(pop);
            popNew.typePop = PopupTypes.NONE;
            popNew.propsPop = {};
            return popNew;
        }
        case actionTypes.TOGGLE_LOAD: {
            const popNew = deepCopy(pop);
            popNew.load = action.data.visible;
            popNew.msgLoad = action.data.msg;
            return popNew;
        }
        case actionTypes.PUSH_TIP_FLASH: {
            const popNew = deepCopy(pop);
            popNew.arrTipFlash.push(action.data.msg);
            return popNew;
        }
        case actionTypes.SHIFT_TIP_FLASH: {
            const popNew = deepCopy(pop);
            popNew.arrTipFlash.shift();
            return popNew;
        }
        case actionTypes.PUSH_TIP_ALERT: {
            const popNew = deepCopy(pop);
            popNew.arrTipAlert.push(action.data.msg);
            return popNew;
        }
        case actionTypes.SHIFT_TIP_ALERT: {
            const popNew = deepCopy(pop);
            popNew.arrTipAlert.shift();
            return popNew;
        }
        default:
            return pop;
    }
};