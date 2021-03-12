import * as actionTypes from './actionTypes';

export const setNameList = names => ({
    type: actionTypes.SET_NAME_LSIT,
    data: {
        names
    }
});