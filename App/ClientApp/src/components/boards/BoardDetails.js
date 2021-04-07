﻿import React, { useEffect, useContext } from 'react';
import Modal from 'react-awesome-modal';
import { BoardStateContext } from "../contexts/BoardStateContext";

import "./TableStyle.css";

const columnNames = [{
    id: "asd",
    columnName: "New"
},
    {
    id: "123",
    columnName: "In progress"
},
    {
    id: "321",
    columnName: "Done"
}
]

const taskNames = [{
    id: "fdrg",
    taskName: "First task",
    columnId: "asd"
},
    {
        id: "aaa",
        taskName: "Second task",
        columnId: "asd"
    },
    {
        id: "1111",
        taskName: "Third task",
        columnId: "321"
    }
]



function BoardDetails() {
    const [boardState, setBoardState] = useContext(BoardStateContext);

    const closeModalWindow = () => {
        setBoardState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    useEffect(() => {
        const listDiv = document.getElementById('columns-list');
        
        for (var i = 0; i < columnNames.length; ++i) {
            const boardColumn = document.createElement('div');
            const boardTitle = document.createElement('div');
            const boardContent = document.createElement('div');
            boardTitle.innerHTML = columnNames[i].columnName;
            boardColumn.classList.add("board-column");
            boardTitle.classList.add("board-title");
            boardContent.classList.add("board-content");
            boardColumn.id = columnNames[i].id;
            boardColumn.appendChild(boardTitle);
            boardColumn.appendChild(boardContent);
            listDiv.appendChild(boardColumn);
            
        }
        
        
        for (var i = 0; i < taskNames.length; ++i) {
            const contentDiv = document.createElement('div');
            contentDiv.classList.add("content-div");
            const matchingDiv = document.getElementById(taskNames[i].columnId);
            contentDiv.innerHTML = taskNames[i].taskName;
            contentDiv.id = taskNames[i].id;
            matchingDiv.appendChild(contentDiv);
        }
        
    }, [])

    return (
        <section>
            <Modal className="create-modal" visible={boardState} width="800" height="600" effect="fadeInRight" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <div height="200" width="780" className="table-of-columns" id="columns-list">
            </div>
                </div>
            </Modal>
        </section >
    )
}

export default BoardDetails;