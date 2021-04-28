import React, { useContext } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { DeleteBoardContext } from "../contexts/DeleteBoardContext";
import { ColumnsContext } from "../contexts/ColumnsContext";

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
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [deleteBoardState, setDeleteBoardState] = useContext(DeleteBoardContext);
    const [columns, setColumns] = useContext(ColumnsContext);

    const openModalBoard = () => {
        setBoardState(props.board);
        document.querySelector(".container").classList.add("blurred-box");
        loadColumns();
        console.log(columns);
    }

    const deleteBoard = () => {
        document.querySelector(".container").classList.add("blurred-box");
        setDeleteBoardState(props.board.boardName);
    }

    const loadColumns = () => {
        fetch("/boards/columns/" + props.board.boardId)
            .then(res => res.json())
            .then(data => setColumns(data));
        
    };

    return (
        <div class="card-container center">
            <div class="card">
                <img src={BoardsIcon} alt="Boards icon" style={ IconStyle }></img>
                <hr />
                <p>{props.board.boardName.length > 15 ? props.board.boardName.substring(0, 15) + "..." : props.board.boardName}</p>
                <button onClick={openModalBoard}>Open</button>
                <button onClick={deleteBoard}>Delete</button>
            </div>
        </div>
    )
}

export default Board;
