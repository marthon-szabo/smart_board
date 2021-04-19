import React, { useContext, useState } from 'react';
import { ColumnsContext } from "../contexts/ColumnsContext";
import { BoardStateContext } from "../contexts/BoardStateContext";
import Column from "./Column";

function showElements(column) {
    return (<Column column={column} />)
}

function Columns() {
    const [boardState, setBoardState] = useContext(BoardStateContext);
    const [columns, setColumns] = useContext(ColumnsContext);
    fetch("/boards/columns/boardname=" + boardState)
        .then(res => res.json())
        .then(data => setColumns(data));
    return columns.map(showElements);
}

export default Columns;