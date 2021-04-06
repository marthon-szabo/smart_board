import React, { useEffect, useContext } from 'react';
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
        const tr = document.createElement('tr');
        for (var i = 0; i < columnNames.length; ++i) {
            const th = document.createElement('th');
            th.innerHTML = columnNames[i].columnName;
            th.bgColor = "#726aa7";
            th.id = columnNames[i].id;
            tr.appendChild(th);
        }
        listDiv.appendChild(tr);
        for (var i = 0; i < taskNames.length; ++i) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const thMatching = document.getElementById(taskNames[i].columnId);
            td.innerHTML = taskNames[i].taskName;
            td.id = taskNames[i].id;
            tr.appendChild(td);
            thMatching.appendChild(tr);
        }
        
    }, [])

    return (
        <section>
            <Modal className="create-modal" visible={boardState} width="800" height="600" effect="fadeInRight" onClickAway={() => closeModalWindow()}>
                <div className="container">
                    <table border="1" height="200" width="780" className="table-of-columns" id="columns-list">
            </table>
                </div>
            </Modal>
        </section >
    )
}

export default BoardDetails;