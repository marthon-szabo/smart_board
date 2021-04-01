import React, { useContext, useState } from 'react';
import Board from "./Board";
import { UserDataContext } from "../contexts/UserDataContext";

function showElements(board) {
    return (<Board board={board}/>)
}

function Boards() {
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;
    const [boards, setBoards] = useState([]);
    fetch("/boards/username=" + username)
        .then(res => res.json())
        .then(data => setBoards(data));

    return boards.map(showElements)
}

export default Boards;