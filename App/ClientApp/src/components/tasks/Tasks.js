import React, { useState } from 'react';
import Task from "./Task";

function showElements(task) {
    return (<Task task={task} />)
}

function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const columnId = props.columnId;
    fetch(`/boards/${columnId}/tasks`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
        .then(res => res.json())
        .then(data => setTasks(data));
    return tasks.map(showElements);
}

export default Tasks;