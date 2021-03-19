import React, { useState, createContext } from 'react';

export const LoginStateContext = createContext();

export const LoginStateProvider = props => {
    const [loginState, setLoginState] = useState(false);

    return (
        <LoginStateContext.Provider value={[loginState, setLoginState]}>
            {props.children}
        </LoginStateContext.Provider>
        )
}
