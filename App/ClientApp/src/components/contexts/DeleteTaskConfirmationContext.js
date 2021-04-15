import React, { useState, createContext } from 'react';

export const DeleteConfirmationContext = createContext();

export const DeleteConfirmationProvider = props => {
    const [deleteConfirmationState, setDeleteConfirmationState] = useState("");

    return (
        <DeleteConfirmationContext.Provider value={[deleteConfirmationState, setDeleteConfirmationState]}>
            {props.children}
        </DeleteConfirmationContext.Provider>
    )
}
