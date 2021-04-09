import React, { useContext } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { UserDataContext } from "../contexts/UserDataContext";

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
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;

    const openModalBoard = () => {
        setBoardState(true);
        document.querySelector(".container").classList.add("blurred-box");
    }

    const deleteBoard = () => {
        const data = JSON.stringify({
            UserName: username,
            BoardName: props.board.boardName
        })
        fetch('boards/delete-board', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <div class="card-container center">
            <div class="card">
                <img src={BoardsIcon} alt="Boards icon" style={ IconStyle }></img>
                <hr />
                <p>{props.board.boardName}</p>
                <button onClick={openModalBoard}>Open</button>
                <button onClick={deleteBoard}>Delete</button>
            </div>
        </div>
    )
}

export default Board;
