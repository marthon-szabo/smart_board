import React, { useState, createContext } from 'react';

export const ModalStateContext = createContext();

export const ModalStateProvider = () => {
    const [loginState, setLoginState] = useState([false]);
    const [registrationState, setRegistrationState] = useState([false]);
    return (
        <ModalStateContext.Provider>
            {props.children}
        </ModalStateContext.Provider>
        )
}
