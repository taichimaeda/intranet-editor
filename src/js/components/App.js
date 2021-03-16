import React, { useEffect, useReducer } from 'react';
import Table from "./Table";
import { handleRemove, handleSelect, handleChange, handleDefault } from "../handlers";

function init(columns) {
    return {
        columns: columns,
        selected: {
            column: null,
            cell: null,
        }
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'select':
            return handleSelect(state, action);
        case 'remove':
            return handleRemove(state, action);
        case 'change':
            return handleChange(state, action);
        default:
            return handleDefault(state, action);
    }
}

export const DispatchContext = React.createContext(null);

export default function App(props) {
    const [state, dispatch] = useReducer(reducer, props.columns, init);

    useEffect(() => {
        chrome.storage.local.set({ columns: state.columns });
    }, [state]);

    useEffect(() => {
        chrome.runtime.sendMessage({command: 'create', content: state.columns});
        chrome.runtime.onMessage.addListener(message => {
            switch (message.command) {
                case 'remove':
                    dispatch({ type: 'remove' });
                    break;
                case 'change':
                    dispatch({
                        type: 'change',
                        target: message.target,
                    });
                    break;
            }
        });
    }, []);

    return (
        <DispatchContext.Provider value={dispatch}>
            <Table columns={state.columns}/>
        </DispatchContext.Provider>
    );
}