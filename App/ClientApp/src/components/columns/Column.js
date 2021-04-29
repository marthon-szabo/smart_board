import React, { useContext } from 'react';
import Tasks from "../tasks/Tasks";
import { Droppable } from 'react-beautiful-dnd';
import { CreateTaskContext } from "../contexts/CreateTaskContext";
import { DeleteColumnConfirmationContext } from "../contexts/DeleteColumnConfirmationContext";
import { BoardStateContext } from "../contexts/BoardStateContext";
import { ColumnsContext } from "../contexts/ColumnsContext";

import "../../static/scss/TableStyle.scss";

import DeleteRed from "../../images/delete-red-background.png";
import PlusIcon from "../../images/plus-green.png";

function Column(props) {

    const item = props.column;

    const [deleteColState, setDeleteColState] = useContext(DeleteColumnConfirmationContext);
    const [openTaskState, setOpenTaskState] = useContext(CreateTaskContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);

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

    const openAddTaskModal = (columnName, columnId) => {
        const columnObj = {
            columnName: columnName,
            columnId: columnId
        }
        setOpenTaskState(columnObj);
    }

    const handleUpdate = (newTitle, columnId, e) => {
        e.preventDefault();
        const data = JSON.stringify({
            BoardId: boardState.boardId,
            ColumnName: newTitle,
            ColumnId: columnId
        })
        fetch('boards/columns', {
            method: 'PATCH',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    const switchToInput = (event, columnId) => {
        const title = event.target;
        const titleName = title.innerHTML;
        
        const inputField = document.createElement("input")
        inputField.setAttribute("type", "text");
        inputField.value = titleName;
        inputField.className = "column-input";
        
        inputField.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                title.innerHTML = inputField.value;
                handleUpdate(inputField.value, columnId, event);
            }
        });

        document.addEventListener("click", () => {
            title.innerHTML = inputField.value;
        });

        title.innerHTML = "";
        title.appendChild(inputField);
        inputField.focus();
        inputField.select();
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
                            <div className="board-title" onDoubleClick={(e) => switchToInput(e, item.id)}>
                                {item.name}
                            </div>
                        </div>
                        <Tasks columnId={item.id} columnName={item.name}/>
                        <img className="add-image hidden"
                            id={"addButton-" + item.id}
                            src={PlusIcon}
                            alt="plus icon"
                            title="Click here to add a new task"
                            onClick={() => openAddTaskModal(item.name, item.id)}
                        >
                        </img>{provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>)
}

export default Column;