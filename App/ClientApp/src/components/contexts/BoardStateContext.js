import React, { useState, createContext } from 'react';

export const BoardStateContext = createContext();

export const BoardStateProvider = props => {
    const [boardState, setBoardState] = useState(false);

    return (
        <BoardStateContext.Provider value={[boardState, setBoardState]}>
            {props.children}
        </BoardStateContext.Provider>
    )
}