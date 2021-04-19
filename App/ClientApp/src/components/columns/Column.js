import React, { useContext } from 'react';
import Tasks from "../tasks/Tasks";
import { Droppable } from 'react-beautiful-dnd';
import { CreateTaskContext } from "../contexts/CreateTaskContext";
import { DeleteColumnConfirmationContext } from "../contexts/DeleteColumnConfirmationContext";


import "../../static/scss/TableStyle.scss";

import DeleteRed from "../../images/delete-red-background.png";
import PlusIcon from "../../images/plus-green.png";




function Column(props) {

    const item = props.column;

    const [deleteColState, setDeleteColState] = useContext(DeleteColumnConfirmationContext);
    const [openTaskState, setOpenTaskState] = useContext(CreateTaskContext);

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

    const openDeleteColumnModal = (columnName) => {
        setDeleteColState(columnName);
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
                        <Tasks />
                        <img className="add-image hidden"
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