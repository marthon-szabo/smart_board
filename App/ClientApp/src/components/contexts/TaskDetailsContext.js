import React, { useState, createContext } from 'react';

export const TaskDetailsContext = createContext();

export const TaskDetailsProvider = props => {
    const [taskState, setTaskState] = useState([]);

    return (
        <TaskDetailsContext.Provider value={[taskState, setTaskState]}>
            {props.children}
        </TaskDetailsContext.Provider>
    )
}