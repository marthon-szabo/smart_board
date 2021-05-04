﻿import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { CreateColumnContext } from "../contexts/columnContexts/CreateColumnContext";
import { BoardStateContext } from "../contexts/boardContexts/BoardStateContext";

function CreateColumnModal() {

    const [openState, setOpenState] = useContext(CreateColumnContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);

    const closeModalWindow = () => {
        setOpenState(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("column-name").value;
        const data = JSON.stringify({
            BoardId: boardState.boardId,
            ColumnName: name,
        })
        fetch('boards/columns', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
        closeModalWindow();
    }

    return (
        <section>
            <Modal className="create-modal" visible={openState} width="400" height="250" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <form id="create-column-form" style={{ padding: '5%' }} onSubmit={(e) => handleSubmit(e) }>
                <div className="container">
                    <div className="create-column-head">
                        <h3>Create a column for <strong>{boardState.boardName}</strong></h3>
                        </div>
                        <div className="form-group">
                            <label>Column name:</label>
                            <input
                                id="column-name"
                                type="text"
                                className="form-control"
                                name='board-name'
                                placeholder="Enter column's name"
                            />
                        </div>
                        <button id="column-btn" type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                        </div>
                    </form>
            </Modal>
        </section>
        )
}

export default CreateColumnModal;
