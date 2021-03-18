import React, { useState, createContext } from 'react';

export const RegisterStateContext = createContext();

export const RegisterStateProvider = props => {
    const [registrationState, setRegistrationState] = useState(false);
    return (
        <RegisterStateContext.Provider value={[registrationState, setRegistrationState]}>
            {props.children}
        </RegisterStateContext.Provider>
    )
}