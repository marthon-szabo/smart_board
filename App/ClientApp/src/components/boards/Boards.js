import React, { useContext, useState } from 'react';
import Board from "./Board";
import { UserDataContext } from "../contexts/UserDataContext";

function showElements(board) {
    return (<Board board={board}/>)
}

function Boards() {
    const [userData, setUserData] = useContext(UserDataContext);
    const userId = userData.userId;
    const [boards, setBoards] = useState([]);
    fetch("boards/" + userId)
        .then(res => res.json())
        .then(data => setBoards(data));

    return boards.map(showElements)
}

export default Boards;