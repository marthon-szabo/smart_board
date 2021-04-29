import React, { useState, createContext } from 'react';

export const DeleteColumnConfirmationContext = createContext();

export const DeleteColumnConfirmationProvider = props => {
    const [deleteColumnConfirmationState, setColumnDeleteConfirmationState] = useState("");

    return (
        <DeleteColumnConfirmationContext.Provider value={[deleteColumnConfirmationState, setColumnDeleteConfirmationState]}>
            {props.children}
        </DeleteColumnConfirmationContext.Provider>
    )
}