import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { CreateColumnContext } from "../contexts/CreateColumnContext";
import { BoardStateContext } from "../contexts/BoardStateContext";

function CreateColumnModal() {

    const [openState, setOpenState] = useContext(CreateColumnContext);
    const [boardName, setBoardName] = useContext(BoardStateContext);

    const closeModalWindow = () => {
        setOpenState(false);
    }

    return (
        <section>
            <Modal className="create-modal" visible={openState} width="400" height="250" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <form id="create-column-form" style={{ padding: '5%' }}>
                <div className="container">
                    <div className="create-column-head">
                        <h3>Create a column for <strong>{boardName}</strong></h3>
                        </div>
                        <div className="form-group">
                            <label>Column name:</label>
                            <input
                                id="column-name"
                                type="text"
                                className="form-control"
                                name='board-name'
                                placeholder="Enter column's name"
                            />
                        </div>
                        <button id="column-btn" type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                        </div>
                    </form>
            </Modal>
        </section>
        )
}

export default CreateColumnModal;
