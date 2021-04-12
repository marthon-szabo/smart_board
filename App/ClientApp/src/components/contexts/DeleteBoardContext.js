import React, { useState, createContext } from 'react';

export const DeleteBoardContext = createContext();

export const DeleteBoardProvider = props => {
    const [deleteBoardState, setDeleteBoardState] = useState(false);

    return (
        <DeleteBoardContext.Provider value={[deleteBoardState, setDeleteBoardState]}>
            {props.children}
        </DeleteBoardContext.Provider>
    )
}