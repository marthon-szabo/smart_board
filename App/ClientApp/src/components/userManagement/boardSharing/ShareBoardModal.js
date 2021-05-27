import React, { useContext, useState } from 'react';
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
        const newUser = (selectedUser === "") ? shareBoardState[0] : selectedUser;
        const data = JSON.stringify({
            BoardName: boardState.boardName,
            NewUser: newUser
        })
        fetch('boards/add-board', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => console.log(res.status))
            .then(loadChangedData());
    }

    const loadChangedData = () => {
        const boardId = boardState.boardId;
        fetch("user/available-users/" + boardId)
            .then(res => res.json())
            .then(data => setShareBoardState(data))
            .then(alert("Board shared successfully!"));
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