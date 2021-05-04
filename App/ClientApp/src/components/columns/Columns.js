import React, { useContext, useState } from 'react';
import { ColumnsContext } from "../contexts/columnContexts/ColumnsContext";
import { BoardStateContext } from "../contexts/boardContexts/BoardStateContext";
import Column from "./Column";

function showElements(column) {
    return (<Column column={column} />)
}

function Columns() {
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [columns, setColumns] = useContext(ColumnsContext);
    const boardId = boardState.boardId;
    
    fetch(`/boards/columns/${boardId}`)
        .then(res => res.json())
        .then(data => setColumns(data));
    return columns.map(showElements);
}

export default Columns;