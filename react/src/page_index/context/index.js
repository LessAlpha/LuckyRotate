import React, {useReducer} from 'react';
import commonReducer, {defaultValue_common} from '../../common/reducer/common';
import popReducer,{defaultValue_pop} from '../../common/reducer/pop';
const context = React.createContext({});

const WrappedProvider = props => {
    const [cState, cDispatch] = useReducer(commonReducer, defaultValue_common);
    const [pState, pDispatch] = useReducer(popReducer, defaultValue_pop);
    const combined = {
        common: {
            state: cState,
            dispatch: cDispatch
        },
        pop: {
            state: pState,
            dispatch: pDispatch
        },

    };

    return (<context.Provider value={combined}>
        {props.children}
    </context.Provider>)
};

export {context};
export default WrappedProvider;