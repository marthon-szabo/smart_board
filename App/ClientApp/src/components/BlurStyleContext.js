import React, { useState, createContext } from 'react';

export const BlurStyleContext = createContext();

export const BlurStyleProvider = props => {
    const [blurStyle, setBlurStyle] = useState("container");
    return (
        <BlurStateContext.Provider value={[blurStyle, setBlurStyle]}>
            {props.children}
        </BlurStateContext.Provider>
    )
}