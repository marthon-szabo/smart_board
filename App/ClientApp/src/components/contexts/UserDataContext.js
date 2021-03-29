import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = props => {
    const [UserDataState, setUserDaraState] = useState([]);

    return (
        <UserDataContext.Provider value={[UserDataState, setUserDataState]}>
            {props.children}
        </UserDataContext.Provider>
    )
}