import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteColumnConfirmationContext } from "../contexts/DeleteColumnConfirmationContext";
import { BoardStateContext } from "../contexts/BoardStateContext";

import DeleteIcon from '../../images/delete.png';

function DeleteColumnConfirmationModal() {

    const [openState, setOpenState] = useContext(DeleteColumnConfirmationContext);
    const [boardName, setBoardName] = useContext(BoardStateContext);

    const closeModalWindow = () => {
        setOpenState("");
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

    const deleteColumn = () => {
        const name = openState;
        const data = JSON.stringify({
            BoardName: boardName,
            ColumnName: name
        })
        fetch('boards/columns', {
            method: 'DELETE',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
        closeModalWindow();
    }

    return (
        <section>
            <Modal className="delete-column-modal" visible={openState.length == 0 ? false : true} width="400" height="335" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div style={{ padding: "0px 25px" }}>
                    <img src={DeleteIcon} alt="delete icon" style={ IconStyle }></img>
                <p>Are you sure you want to delete this column?</p>
                <p>Column name: <strong>{openState}</strong> </p>
                    <p>From this table: <strong>{boardName}</strong> </p>
                    <button style={DeleteStyle} id="delete-btn" type="submit" className="btn btn-primary btn-block" onClick={() => deleteColumn()}>Yes</button>
                    <button id="cancel-btn" type="submit" className="btn btn-primary btn-block" onClick={() => closeModalWindow()}>Cancel</button>
                    </div>
            </Modal>
        </section>
    )}

export default DeleteColumnConfirmationModal;