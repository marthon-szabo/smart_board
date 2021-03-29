import React, { useState, createContext } from 'react';

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = props => {
    const [loggedInUserState, setLoggedInUserState] = useState(false);

    return (
        <LoggedInUserContext.Provider value={[loggedInUserState, setLoggedInUserState]}>
            {props.children}
        </LoggedInUserContext.Provider>
    )
}