import React, { useState, createContext } from 'react';

export const CreateTaskContext = createContext();

export const CreateTaskProvider = props => {
    const [createTaskState, setCreateTaskState] = useState(false);

    return (
        <CreateTaskContext.Provider value={[createTaskState, setCreateTaskState]}>
            {props.children}
        </CreateTaskContext.Provider>
    )
}