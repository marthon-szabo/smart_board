import React, { useState, createContext } from 'react';

export const CreateBoardContext = createContext();

export const CreateBoardProvider = props => {
    const [createBoardState, setCreateBoardState] = useState(false);

    return (
        <CreateBoardContext.Provider value={[createBoardState, setCreateBoardState]}>
            {props.children}
        </CreateBoardContext.Provider>
    )
}
