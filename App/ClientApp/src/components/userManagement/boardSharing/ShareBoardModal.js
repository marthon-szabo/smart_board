﻿import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import { AddUserToBoardContext } from "../../contexts/userContexts/AddUserToBoardContext";
import { BoardStateContext } from "../../contexts/boardContexts/BoardStateContext";

import "./ShareBoardModal.scss";

function ShareBoardModal() {

    const [shareBoardState, setShareBoardState] = useContext(AddUserToBoardContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [selectedUser, setSelectedUser] = useState("");

    const closeShareWindow = () => {
        setShareBoardState([]);
    }

    function showUsers(username) {
        return (<option value={username}>{username}</option>)
    }

    const saveChange = (e) => {
        setSelectedUser(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            BoardName: boardState.boardName,
            newUser: selectedUser
        })
        fetch('boards/add-board', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => console.log(res.status));
        console.log(selectedUser);
        console.log(boardState);
    }

    return (
        <section>
            <Modal className="share-board-modal" visible={shareBoardState.length == 0 ? false : true} width="400" height="350" effect="fadeInDown" onClickAway={() => closeShareWindow()}>
                <p>Select a user to add as a contributor to this board:</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select className="select-user" onChange={(e) => saveChange(e)}>
                        {shareBoardState.map(showUsers)}
                    </select>
                    <button id="send-new-user-btn" type="submit" className="btn btn-primary btn-block">
                        Add user
                    </button>
                </form>
            </Modal>
        </section>
        )
}

export default ShareBoardModal;