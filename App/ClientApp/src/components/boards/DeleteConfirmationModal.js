import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteBoardContext } from "../contexts/boardContexts/DeleteBoardContext";
import { UserDataContext } from "../contexts/userContexts/UserDataContext";
import { BoardStateContext } from "../contexts/boardContexts/BoardStateContext";


import DeleteIcon from '../../images/delete.png';

function DeleteConfirmationModal() {

    const [errorState, setErrorState] = useState(null);
    const [deleteBoardState, setDeleteBoardState] = useContext(DeleteBoardContext);
    const [userData, setUserData] = useContext(UserDataContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);

    const username = userData.userName;

    const IconStyle = {
        display: "block",
        width: "80px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "15px",
        marginBottom: "15px",
        alignContent: "center",
        verticalAlign: "middle"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("board-name-to-delete").value;

        if (name === deleteBoardState.boardName) {
            const data = JSON.stringify({
                UserName: username,
                BoardName: deleteBoardState.BoardName,
                BoardId: deleteBoardState.boardId
            })

            fetch('boards/delete-board', {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => console.log(data));
            closeModalWindow();
        } else {
            setErrorState("Board names are not matching");
        }
    }

    const closeModalWindow = () => {
        setDeleteBoardState("");
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }


    return (
        <section>
            <Modal className="create-modal" visible={deleteBoardState.length == 0 ? false : true } width="400" height="300" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <img src={DeleteIcon} alt="Plus icon" style={IconStyle}></img>
                <form id="delete-board-form" style={{ padding: '5%' }} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Please confirm the table that you want to delete:</label>
                        <input
                            id="board-name-to-delete"
                            type="text"
                            className="form-control"
                            name='board-name'
                            placeholder="Enter board's name"
                        />
                        {errorState && <p>{errorState}</p>}
                    </div>
                    <button id="delete-btn" type="submit" className="btn btn-primary btn-block">
                        Delete
                        </button>
                </form>
            </Modal>
        </section>
        )
}

export default DeleteConfirmationModal;
