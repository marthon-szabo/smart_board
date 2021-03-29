import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = props => {
    const [userDataState, setUserDataState] = useState([]);

    return (
        <UserDataContext.Provider value={[userDataState, setUserDataState]}>
            {props.children}
        </UserDataContext.Provider>
    )
}