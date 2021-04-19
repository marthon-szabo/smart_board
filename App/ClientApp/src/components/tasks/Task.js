﻿import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnsContext } from "../contexts/ColumnsContext";
import { DeleteTaskConfirmationContext } from "../contexts/DeleteTaskConfirmationContext";

import "../../static/scss/TableStyle.scss";

import DeleteIcon from "../../images/deleteRed.png";

function Task(props) {
    const [columnName, setColumnName] = useContext(ColumnsContext);
    const [deleteTaskState, setDeleteTaskState] = useContext(DeleteTaskConfirmationContext);

    const [taskId, setTaskId] = useState(null);

    const handleClick = (e, data) => {
        console.log(data);
        setTaskId(data);
    }

    function getElement(elemType, taskId) {
        return document.getElementById(elemType + taskId);
    }

    const showHiddenElementsTask = (e, id) => {
        const elemToShowAdd = getElement("removeButton-", id);
        elemToShowAdd.classList.remove("hidden");
    }

    const hideHiddenElementsTask = (e, id) => {
        const elemToShowAdd = getElement("removeButton-", id);
        elemToShowAdd.classList.add("hidden");
    }

    const openDeleteTaskModal = (columnName, taskName) => {
        const taskObj = {
            columnName: columnName,
            taskName: taskName
        }
        setDeleteTaskState(taskObj);
    }

    return (
        <div id={props.task.id} onMouseDown={((e) => handleClick(e, props.task.id))}>
            <Draggable key={props.task.id} draggableId={props.task.id} index={props.task.index} >
                {(provided) => (
                    <div className="content-div" onMouseEnter={(e) => showHiddenElementsTask(e, props.task.id)} onMouseLeave={(e) => hideHiddenElementsTask(e, props.task.id)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div style={{ position: "relative" }}>
                            <img className="remove-task-button hidden" id={"removeButton-" + props.task.id} src={DeleteIcon} alt="delete icon" title="Click here to delete this task" onClick={() => openDeleteTaskModal(columnName, props.task.taskName)}></img>
                            {props.task.taskName}
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default Task;