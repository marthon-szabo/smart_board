import React from 'react';
import Board from "./Board";

const exapmleBoards = [
    {
        boardName: "First"
    },
    {
        boardName: "Second"
    },
    {
        boardName: "Last"
    }
]

function showElements(board) {
    return (<Board board={board}/>)
}

function Boards() {
    return exapmleBoards.map(showElements)
}

export default Boards;