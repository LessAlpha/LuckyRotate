import * as actionTypes from './actionTypes';

export const showPop = (typePop, propsPop) => ({
    type: actionTypes.SHOW,
    data: {
        typePop, propsPop
    }
});

export const hidePop = () => ({
    type: actionTypes.HIDE
});

export const toggleLoad = (visible, msg) => ({
    type: actionTypes.TOGGLE_LOAD,
    data: {
        visible, msg
    }
});

// export const setTipMsg = (msg) => ({
//     type: actionTypes.SET_TIP_MSG,
//     data: {
//         msg
//     }
// });

export const pushTipFlash = (msg) => ({
    type: actionTypes.PUSH_TIP_FLASH,
    data: {
        msg
    }
});

export const pushTipAlert = (msg) => ({
    type: actionTypes.PUSH_TIP_ALERT,
    data: {
        msg
    }
});

export const shiftTipFlash = () => ({
    type: actionTypes.SHIFT_TIP_FLASH
});

export const shiftTipAlert = () => ({
    type: actionTypes.SHIFT_TIP_ALERT
});