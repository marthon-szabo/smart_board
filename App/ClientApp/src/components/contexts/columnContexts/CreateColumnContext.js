import React, { useState, createContext } from 'react';

export const CreateColumnContext = createContext();

export const CreateColumnProvider = props => {
    const [createColumnState, setCreateColumnState] = useState(false);

    return (
        <CreateColumnContext.Provider value={[createColumnState, setCreateColumnState]}>
            {props.children}
        </CreateColumnContext.Provider>
    )
}
