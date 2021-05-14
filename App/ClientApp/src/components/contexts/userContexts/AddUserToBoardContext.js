import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

export const AddUserToBoardProvider = props => {
    const [availableUsersState, setAvailableUsersState] = useState([]);

    return (
        <AddUserToBoardContext.Provider value={[availableUsersState, setAvailableUsersState]}>
            {props.children}
        </AddUserToBoardContext.Provider>
    )
}