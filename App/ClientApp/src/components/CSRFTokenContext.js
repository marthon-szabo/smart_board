import React, { useState, createContext } from 'react';

export const CSRFTokenContext = createContext();

export const CSRFTokenContextProvider = props => {
    const [csrfToken, setCsrfToken] = useState("");

    return (
        <CSRFTokenContext.Provider value={[csrfToken, setCsrfToken]}>
            {props.children}
        </CSRFTokenContext.Provider>
        )
}
