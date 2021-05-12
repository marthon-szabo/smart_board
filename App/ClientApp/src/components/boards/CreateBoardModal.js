import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { CreateBoardContext } from "../contexts/CreateBoardContext";
import { UserDataContext } from "../contexts/UserDataContext";
import ChatHelper from '../../Utilities/ChatHelper';
import ChatClient from '../chat/ChatClient';

function CreateBoardModal() {
    const [createBoardState, setCreateBoardState] = useContext(CreateBoardContext);
    const [userData, setUserData] = useContext(UserDataContext);
    const userId = userData.userId;
    const chatHelper = new ChatHelper();

    const closeModalWindow = () => {
        setCreateBoardState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    const handleSubmit = e => {
        e.preventDefault();
        const name = document.getElementById("board-name").value;
        const data = JSON.stringify({
            UserId: userId,
            BoardName: name,
        })
        console.log(ChatHelper.connection)
        fetch('boards/create-board', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => chatHelper.createChatGroup(data))
            // .then(data => );
        closeModalWindow();
    }

    return (
        <section>
            <Modal className="create-modal" visible={createBoardState} width="400" height="250" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <form id="create-board-form" style={{ padding: '5%' }} onSubmit={handleSubmit}>
                    <div className="login-head">
                        <h3>Create a board</h3>
                    </div>
                    <div className="form-group">
                        <label>Board name:</label>
                            <input
                                id="board-name"
                                type="text"
                                className="form-control"
                                name='board-name'
                                placeholder="Enter board's name"
                            />
                        </div>
                        <button id="login-btn" type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                    </form>
                    </div>
            </Modal>
        </section>
        )
}

export default CreateBoardModal;