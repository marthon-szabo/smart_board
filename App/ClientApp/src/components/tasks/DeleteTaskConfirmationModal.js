import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteTaskConfirmationContext } from "../contexts/taskContexts/DeleteTaskConfirmationContext";

import DeleteIcon from '../../images/delete.png';

function DeleteTaskConfirmationModal() {

    const [openState, setOpenState] = useContext(DeleteTaskConfirmationContext);

    const closeModalWindow = () => {
        setOpenState([]);
    }

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

    const DeleteStyle = {
        backgroundColor: "#f34336",
        borderColor: "#f34336",
        border: "1px solid transparent",
        padding: "0.375rem 0.75rem"
    }

    const taskId = openState.taskId;
    const deleteTask = () => {
        fetch(`boards/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => console.log(data));
        closeModalWindow();
    }

    return (
        <section>
            <Modal className="delete-task-modal" visible={openState.length == 0 ? false : true} width="400" height="335" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div style={{ padding: "0px 25px" }}>
                    <img src={DeleteIcon} alt="delete icon" style={IconStyle}></img>
                    <p>Are you sure you want to delete this task?</p>
                    <p>Task name: <strong>{openState.taskName}</strong> </p>
                    <p>Column name: <strong>{openState.columnName}</strong> </p>
                    <button style={DeleteStyle} id="delete-btn" onClick={deleteTask} type="submit" className="btn btn-primary btn-block">Yes</button>
                    <button id="cancel-btn" type="submit" className="btn btn-primary btn-block" onClick={closeModalWindow}>Cancel</button>
                </div>
            </Modal>
        </section>
    )
}

export default DeleteTaskConfirmationModal;