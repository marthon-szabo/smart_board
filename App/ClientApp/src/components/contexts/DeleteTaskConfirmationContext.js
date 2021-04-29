import React, { useState, createContext } from 'react';

export const DeleteTaskConfirmationContext = createContext();

export const DeleteTaskConfirmationProvider = props => {
    const [deleteTaskConfirmationState, setDeleteTaskConfirmationState] = useState("");

    return (
        <DeleteTaskConfirmationContext.Provider value={[deleteTaskConfirmationState, setDeleteTaskConfirmationState]}>
            {props.children}
        </DeleteTaskConfirmationContext.Provider>
    )
}
