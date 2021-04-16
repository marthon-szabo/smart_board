import React, { useState, createContext } from 'react';

export const ColumnsContext = createContext();

export const ColumnsProvider = props => {
    const [columnsState, setColumnsState] = useState([]);

    return (
        <ColumnsContext.Provider value={[columnsState, setColumnsState]}>
            {props.children}
        </ColumnsContext.Provider>
    )
}