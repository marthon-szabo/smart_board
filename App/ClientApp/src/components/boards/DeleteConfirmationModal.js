import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteBoardContext } from "../contexts/DeleteBoardContext";
import { UserDataContext } from "../contexts/UserDataContext";

import DeleteIcon from '../../images/delete.png';


function DeleteConfirmationModal() {

    const [deleteBoardState, setDeleteBoardState] = useContext(DeleteBoardContext);
    const [username, setUsername] = useContext(UserDataContext);

    const IconStyle = {
        width: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "15px",
        marginBottom: "15px"
    }

    const deleteBoardFetch = () => {
        const data = JSON.stringify({
            UserName: username,
            BoardName: deleteBoardState
        })
        fetch('boards/delete-board', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    const closeModalWindow = () => {
        setDeleteBoardState("");
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    return (
        <section>
            <Modal className="create-modal" visible={deleteBoardState.length == 0 ? false : true } width="400" height="350" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <img src={DeleteIcon} alt="Plus icon" style={IconStyle}></img>
                <p> { deleteBoardState } </p>
            </Modal>
        </section>
        )
}

export default DeleteConfirmationModal;