import React, { createContext, useReducer } from 'react' ;
import { DOC_REDUCER } from '../const/ReducersConst';

const initialState = {};

export const store = createContext(initialState);

const { Provider } = store;

export const StateProvider: React.FC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer((state: any, action: { type: any; }) => {
        switch(action.type) {
            case DOC_REDUCER.DOCUMENTS:
                return {...state};
            default:
                return state;
        }
    }, initialState);

    return <Provider value={[ state, dispatch ]}>{children}</Provider>
};