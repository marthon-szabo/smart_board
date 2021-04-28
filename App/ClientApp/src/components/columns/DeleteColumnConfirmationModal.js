import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { DeleteColumnConfirmationContext } from "../contexts/DeleteColumnConfirmationContext";
import { BoardStateContext } from "../contexts/BoardStateContext";
import { ColumnsContext } from "../contexts/ColumnsContext";

import DeleteIcon from '../../images/delete.png';

function DeleteColumnConfirmationModal() {

    const [openState, setOpenState] = useContext(DeleteColumnConfirmationContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [columnState, setColumnState] = useContext(ColumnsContext);

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
        const name = columnState.columnName;
        const boardId = boardState.boardId;
        const columnId = columnState.columnId;

        const data = JSON.stringify({
            BoardId: boardId,
            ColumnName: name,
            ColumnId: columnId

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
                    <p>From this table: <strong>{boardState.boardName}</strong> </p>
                    <button style={DeleteStyle} id="delete-btn" type="submit" className="btn btn-primary btn-block" onClick={() => deleteColumn()}>Yes</button>
                    <button id="cancel-btn" type="submit" className="btn btn-primary btn-block" onClick={() => closeModalWindow()}>Cancel</button>
                    </div>
            </Modal>
        </section>
    )}

export default DeleteColumnConfirmationModal;