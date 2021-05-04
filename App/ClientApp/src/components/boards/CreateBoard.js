import React, { useContext } from 'react';
import { CreateBoardContext } from "../contexts/boardContexts/CreateBoardContext";

import PlusIcon from '../../images/plus.png';
import './BoardCard.scss';

const IconStyle = {
    width: "80px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "15px"
}

function CreateBoard() {
    const [createBoardState, setCreateBoardState] = useContext(CreateBoardContext);

    const openModalCreateBoard = () => {
        setCreateBoardState(true);
        document.querySelector(".container").classList.add("blurred-box");
    }

    return (
            
        <div className="card-container center">
            <div className="card">
                <img src={PlusIcon} alt="Plus icon" style={ IconStyle }></img>
                <hr />
                <p>Click the button to create a new board!</p>
                <button onClick={ openModalCreateBoard }>Create</button>
            </div>
            </div>
        )
}

export default CreateBoard;