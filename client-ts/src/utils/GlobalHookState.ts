import { createStore } from "react-hooks-global-state";

const initialState = {
    validationErrors: [],
    shouldLoadAllDocuments: false,
};

type State = typeof initialState;

const VALIDATION_ERRORS = 'validationErrors';

type Action = { type: string, payload: any };

const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'VALIDATION_ERRORS':
            return {
                ...state,
                validationErrors: action.payload.errors,
            };
        case 'LOAD_ALL_DOCUMENTS':
            return {
                ...state,
                shouldLoadAllDocuments: action.payload.shouldLoadAllDocuments
            };
        default:
            return state;
    }
};

export const { dispatch, useGlobalState } = createStore(reducer, initialState);