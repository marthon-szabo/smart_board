import React, { useState, createContext } from 'react';

export const AvailableQuestDetailContext = createContext();

export const AvailableQuestDetailProvider = props => {
    const [availableQuestState, setAvailableQuestState] = useState([]);

    return (
        <AvailableQuestDetailContext.Provider value={[availableQuestState, setAvailableQuestState]}>
            {props.children}
        </AvailableQuestDetailContext.Provider>
    )
}
