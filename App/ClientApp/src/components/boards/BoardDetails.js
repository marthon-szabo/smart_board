import React, { useContext, useState, useEffect } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { CreateColumnContext } from "../contexts/CreateColumnContext";
import { DragDropContext } from 'react-beautiful-dnd';
import BoardModal from './BoardModalComponents/BoardModal';
import Columns from '../columns/Columns';

import "./TableStyle.css";
import PlusIcon from "../../images/plus-green.png";
import DeleteIcon from "../../images/deleteRed.png";
import DeleteRed from "../../images/delete-red-background.png";

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
                            <Columns/>
                            <img src={PlusIcon} alt="plus icon" style={{ height: "30px", display: "block", marginTop: "5px" }} title="Click here to add a new column" onClick={() => openAddColumnModal()}></img>
                        </div>
                    </DragDropContext>
                </div>
            </BoardModal>
        </section >
    )
}

export default BoardDetails;