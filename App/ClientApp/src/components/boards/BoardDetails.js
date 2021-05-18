import React, { useContext, useState } from 'react';
import { BoardStateContext } from "../contexts/boardContexts/BoardStateContext";
import { CreateColumnContext } from "../contexts/columnContexts/CreateColumnContext";
import { AddUserToBoardContext } from "../contexts/userContexts/AddUserToBoardContext";
import { DragDropContext } from 'react-beautiful-dnd';
import BoardModal from './BoardModalComponents/BoardModal';
import Columns from '../columns/Columns';

import "../../static/scss/TableStyle.scss";
import PlusIcon from "../../images/plus-green.png";

function BoardDetails() {
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [openColumnState, setOpenColumnState] = useContext(CreateColumnContext);
    const [addUserState, setAddUserState] = useContext(AddUserToBoardContext);
    const [taskId, setTaskId] = useState(null);

    const closeModalWindow = () => {
        setBoardState([]);
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
        }
    }

    const openAddColumnModal = () => {
        setOpenColumnState(true);
    }

    const openAddUserModal = () => {
        fetch("user/available-users")
            .then(res => res.json())
            .then(data => setAddUserState(data));
    }

    return (
        <section>
            <BoardModal className="create-modal" visible={boardState.length == 0 ? false : true} width="800" height="670" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <button className="add-user-button" onClick={openAddUserModal}>Add user</button>
                    <div className="board-title-header">
                        <h1> { boardState.boardName } </h1>
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