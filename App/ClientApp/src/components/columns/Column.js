import React, { useContext, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CreateTaskContext } from "../contexts/CreateTaskContext";
import { DeleteColumnConfirmationContext } from "../contexts/DeleteColumnConfirmationContext";
import { DeleteTaskConfirmationContext } from "../contexts/DeleteTaskConfirmationContext";

import "../../static/scss/TableStyle.scss";
import DeleteIcon from "../../images/deleteRed.png";
import DeleteRed from "../../images/delete-red-background.png";
import PlusIcon from "../../images/plus-green.png";


const taskNames = [{
    id: "fdrg",
    taskName: "First task",
    columnId: "asd"
},
{
    id: "aaa",
    taskName: "Second task",
    columnId: "asd"
},
{
    id: "1111",
    taskName: "Third task",
    columnId: "321"
}]

function Column(props) {

    const item = props.column;
    
    const [deleteColState, setDeleteColState] = useContext(DeleteColumnConfirmationContext);
    const [deleteTaskState, setDeleteTaskState] = useContext(DeleteTaskConfirmationContext);
    const [openTaskState, setOpenTaskState] = useContext(CreateTaskContext);

    const [taskId, setTaskId] = useState(null);

    const handleClick = (e, data) => {
        console.log(data);
        setTaskId(data);
    }


    function getElement(elemType, taskId) {
        return document.getElementById(elemType + taskId);
    }

    const showHiddenElements = (e, id) => {
        const elemToShowAdd = getElement("addButton-", id);
        elemToShowAdd.classList.remove("hidden");
        const elemToShowDelete = getElement("removeButton-", id);
        elemToShowDelete.classList.remove("hidden");
    }

    const hideHiddenElements = (e, id) => {
        const elemToShowAdd = getElement("addButton-", id);
        elemToShowAdd.classList.add("hidden");
        const elemToShowDelete = getElement("removeButton-", id);
        elemToShowDelete.classList.add("hidden");
    }

    const showHiddenElementsTask = (e, id) => {
        const elemToShowAdd = getElement("removeButton-", id);
        elemToShowAdd.classList.remove("hidden");
    }

    const hideHiddenElementsTask = (e, id) => {
        const elemToShowAdd = getElement("removeButton-", id);
        elemToShowAdd.classList.add("hidden");
    }

    const openDeleteColumnModal = (columnName) => {
        setDeleteColState(columnName);
    }

    const openDeleteTaskModal = (columnName, taskName) => {
        const taskObj = {
            columnName: columnName,
            taskName: taskName
        }
        setDeleteTaskState(taskObj);
    }

    const openAddTaskModal = (columnName) => {
        setOpenTaskState(columnName);
    }

    return (
                <Droppable droppableId={item.id}>
                    {(provided) => (
                        <div {...provided.droppableProps}
                            ref={provided.innerRef}>
                            <div className="board-column" id={item.id} onMouseEnter={(e) => showHiddenElements(e, item.id)} onMouseLeave={(e) => hideHiddenElements(e, item.id)} style={{ margin: "5px" }}>
                                <div className="board-header" style={{ position: "relative" }}>
                                    <img className="remove-column-button hidden"
                                        id={"removeButton-" + item.id}
                                        src={DeleteRed} alt="delete icon"
                                        title="Click here to delete this column"
                                        onClick={() => openDeleteColumnModal(item.name)}
                                    ></img>
                                    <div className="board-title">
                                        {item.name}
                                    </div>
                                </div>
                                {taskNames.map((taskItem, index) => (
                                    taskItem.columnId === item.id && (
                                        <div id={taskItem.id} onMouseDown={((e) => handleClick(e, taskItem.id))}>
                                            <Draggable key={taskItem.id} draggableId={taskItem.id} index={index} >
                                                {(provided) => (
                                                    <div className="content-div" onMouseEnter={(e) => showHiddenElementsTask(e, taskItem.id)} onMouseLeave={(e) => hideHiddenElementsTask(e, taskItem.id)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <div style={{ position: "relative" }}>
                                                            <img className="remove-task-button hidden" id={"removeButton-" + taskItem.id} src={DeleteIcon} alt="delete icon" title="Click here to delete this task" onClick={() => openDeleteTaskModal(item.name, taskItem.taskName)}></img>
                                                            {taskItem.taskName}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        </div>
                                    )))
                                }<img className="add-image hidden"
                                    id={"addButton-" + item.id}
                                    src={PlusIcon}
                                    alt="plus icon"
                                    title="Click here to add a new task"
                                    onClick={() => openAddTaskModal(item.name)}
                                >
                                </img>{provided.placeholder}
                            </div>
                        </div>
            )}
        </Droppable>)
}

export default Column;
