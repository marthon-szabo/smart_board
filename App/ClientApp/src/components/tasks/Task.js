import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnsContext } from "../contexts/ColumnsContext";
import { DeleteTaskConfirmationContext } from "../contexts/DeleteTaskConfirmationContext";
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

import "../../static/scss/TableStyle.scss";

import DeleteIcon from "../../images/deleteRed.png";

function Task(props) {
    const [column, setColumn] = useContext(ColumnsContext);
    const [deleteTaskState, setDeleteTaskState] = useContext(DeleteTaskConfirmationContext);
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);

    const [taskId, setTaskId] = useState(null);
    const parentColumn = column;

    const index = 0;

    const handleClick = (e, data) => {
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

    const openDeleteTaskModal = (columnName, columnId, taskId, taskName) => {
        const taskObj = {
            columnName: props.columnName,
            columnId: columnId,
            taskId: taskId,
            taskName: taskName
        }
        setDeleteTaskState(taskObj);
    }

    const openDetailModal = () => {
        setTaskDetails(props.task);
        console.log(props.task);
    }

    return (
        <div id={props.task.id} onMouseDown={((e) => handleClick(e, props.task.id))}>
            <Draggable key={props.task.id} draggableId={props.task.id} index={index}>
                {(provided) => (
                    <div className="content-div"
                        title="Double click for more details"
                        onDoubleClick={openDetailModal}
                        onMouseEnter={(e) => showHiddenElementsTask(e, props.task.id)}
                        onMouseLeave={(e) => hideHiddenElementsTask(e, props.task.id)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div style={{ position: "relative" }}>
                            <img className="remove-task-button hidden" id={"removeButton-" + props.task.id} src={DeleteIcon} alt="delete icon" title="Click here to delete this task" onClick={() => openDeleteTaskModal(parentColumn, props.task.columnId, props.task.id, props.task.taskName)}></img>
                            {props.task.taskName}
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default Task;