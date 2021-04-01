import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { CreateBoardContext } from "../contexts/CreateBoardContext";

function CreateBoardModal() {
    const [createBoardState, setCreateBoardState] = useContext(CreateBoardContext);

    const closeModalWindow = () => {
        setCreateBoardState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    return (
        <section>
            <Modal className="create-modal" visible={createBoardState} width="400" height="350" effect="fadeInRight" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <form style={{ padding: '5%' }}>
                    <div className="login-head">
                        <h3>Create a board</h3>
                    </div>
                    <div className="form-group">
                        <label>Board name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name='board-name'
                            placeholder="Enter username"
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