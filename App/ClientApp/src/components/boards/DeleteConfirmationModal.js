import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteModalContext } from "../contexts/DeleteModalContext";
import { UserDataContext } from "../contexts/UserDataContext";

import DeleteIcon from '../../images/delete.png';


function DeleteConfirmationModal() {

    const [deleteBoardState, setDeleteBoardState] = useContext(DeleteModalContext);

    const IconStyle = {
        width: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "15px",
        marginBottom: "15px"
    }

    const closeModalWindow = () => {
        setDeleteBoardState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    return (
        <section>
            <Modal className="create-modal" visible={deleteBoardState} width="400" height="350" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <img src={DeleteIcon} alt="Plus icon" style={IconStyle}></img>
            </Modal>
        </section>
        )
}

export default DeleteConfirmationModal;