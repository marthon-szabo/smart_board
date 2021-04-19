import React from 'react';
import Task from "./Task";

const taskNames = [{
    id: "fdrg",
    index: 1,
    taskName: "First task",
    columnId: "asd"
},
{
    id: "aaa",
    index: 2,
    taskName: "Second task",
    columnId: "asd"
},
{
    id: "1111",
    index: 3,
    taskName: "Third task",
    columnId: "321"
}]

function showElements(task) {
    return (<Task task={task} />)
}

function Tasks() {
    return taskNames.map(showElements);
}

export default Tasks;