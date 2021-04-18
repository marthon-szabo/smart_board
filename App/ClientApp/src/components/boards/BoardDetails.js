import React, { useContext, useState, useEffect } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { CreateColumnContext } from "../contexts/CreateColumnContext";
import { DragDropContext } from 'react-beautiful-dnd';
import BoardModal from './BoardModalComponents/BoardModal';
<<<<<<< HEAD
import Columns from '../columns/Columns';

import "./TableStyle.css";
import PlusIcon from "../../images/plus-green.png";
=======
import { ColumnsContext } from '../contexts/ColumnsContext';

import "./TableStyle.css";
import PlusIcon from "../../images/plus-green.png";
import DeleteIcon from "../../images/deleteRed.png";
import DeleteRed from "../../images/delete-red-background.png";
>>>>>>> 21b062159706ae7879caade55aa754f6f113c55d

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

function BoardDetails() {
    const [boardState, setBoardState] = useContext(BoardStateContext);
<<<<<<< HEAD
=======
    const [columns, setColumns] = useContext(ColumnsContext);
    const [tasks, setTasks] = useState([]);
    const [deleteColState, setDeleteColState] = useContext(DeleteColumnConfirmationContext);
    const [deleteTaskState, setDeleteTaskState] = useContext(DeleteTaskConfirmationContext);
>>>>>>> 21b062159706ae7879caade55aa754f6f113c55d
    const [openColumnState, setOpenColumnState] = useContext(CreateColumnContext);
    const [taskId, setTaskId] = useState(null);

    const closeModalWindow = () => {
        setBoardState("");
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }


    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId != destination.droppableId) {
            console.log(source);
            console.log(destination);
            console.log(taskId);
            for (let i = 0; i < taskNames.length; i++) {
                console.log(taskNames[i].id);
                if (taskNames[i].id === taskId) {
                    taskNames[i].columnId = destination.droppableId;
                }
            }
        }
    }

    const openAddColumnModal = () => {
        setOpenColumnState(true);
    }

    return (
        <section>
            <BoardModal className="create-modal" visible={boardState.length == 0 ? false : true} width="800" height="670" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <div className="board-title-header">
                        <h1> { boardState } </h1>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div width="780" className="table-of-columns" id="columns-list">
<<<<<<< HEAD
                            <Columns/>

=======
                            {
                                columns.map((item) => (
                                    <Droppable droppableId={ item.id}>
                            {(provided) => (
                                <div {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                                <div className="board-column" id={item.id} onMouseEnter={(e) => showHiddenElements(e, item.id)} onMouseLeave={(e) => hideHiddenElements(e, item.id)} style={{ margin: "5px" }}>
                                                    <div className="board-header" style={{position:"relative"}}>
                                                        <img className="remove-column-button hidden"
                                                            id={"removeButton-" + item.id}
                                                            src={DeleteRed} alt="delete icon"
                                                            title="Click here to delete this column"
                                                            onClick={() => openDeleteColumnModal(item.name) }
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
                                                                                    <img className="remove-task-button hidden" id={"removeButton-" + taskItem.id} src={DeleteIcon} alt="delete icon" title="Click here to delete this task" onClick={() => openDeleteTaskModal(item.columnName, taskItem.taskName)}></img>
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
                                                        onClick={() => openAddTaskModal(item.columnName)} 
                                                    >
                                                    </img>{provided.placeholder}
                                            </div>
                                </div>
                            )}
                                    </Droppable>
                                ))}
>>>>>>> 21b062159706ae7879caade55aa754f6f113c55d
                            <img src={PlusIcon} alt="plus icon" style={{ height: "30px", display: "block", marginTop: "5px" }} title="Click here to add a new column" onClick={() => openAddColumnModal()}></img>
                        </div>
                    </DragDropContext>
                </div>
            </BoardModal>
        </section >
    )
}

export default BoardDetails;