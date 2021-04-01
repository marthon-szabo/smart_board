import React, { useContext, useEffect } from 'react';
import Board from "./Board";
import { UserDataContext } from "../contexts/UserDataContext";

let exapmleBoards = []

function showElements(board) {
    return (<Board board={board}/>)
}

function Boards() {
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;
    fetch("/boards/username=" + username)
        .then(res => res.json())
        .then(data => console.log(data));

    return exapmleBoards.map(showElements)
}

export default Boards;