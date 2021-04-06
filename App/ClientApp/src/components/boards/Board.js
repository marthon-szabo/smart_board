import React from 'react';
import BoardStateContext from "./BoardStateContext";

import BoardsIcon from '../../images/boards.png';
import './BoardCard.scss';

const IconStyle = {
    width: "80px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "15px"
}


function Board(props) {
    return (
        <div class="card-container center">
            <div class="card">
                <img src={BoardsIcon} alt="Boards icon" style={ IconStyle }></img>
                <hr />
                <p>{props.board.boardName}</p>
                <button>Open</button>
            </div>
        </div>
    )
}

export default Board;
