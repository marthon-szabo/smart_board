import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import { AddUserToBoardContext } from "../../contexts/userContexts/AddUserToBoardContext";

function ShareBoardModal() {

    const [shareBoardState, setShareBoardState] = useContext(AddUserToBoardContext);
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
        console.log(selectedUser);
    }

    return (
        <section>
            <Modal className="share-board-modal" visible={shareBoardState.length == 0 ? false : true} width="400" height="350" effect="fadeInDown" onClickAway={() => closeShareWindow()}>
                <p>Select a user to add as a contributor to this board:</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select onChange={(e) => saveChange(e)}>
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