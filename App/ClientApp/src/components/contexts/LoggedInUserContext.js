import React, { useState, createContext } from 'react';

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = props => {
    const [loggedInUserState, setLoggedInUserState] = useState(true);

    return (
        <LoggedInUserContext.Provider value={[loggedInUserState, setLoggedInUserState]}>
            {props.children}
        </LoggedInUserContext.Provider>
    )
}