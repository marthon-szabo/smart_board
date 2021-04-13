import React, { useContext } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BoardModal from './BoardModalComponents/BoardModal';

import "./TableStyle.css";
import PlusIcon from "../../images/plus.png";
import HamburgerIcon from "../../images/hamburger-icon.png";

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

    const onDragging = (e) => {
        console.log(e.target);
    }

    return (
        <section>
            <BoardModal className="create-modal" visible={boardState} width="800" height="600" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div className="hamburger-menu">
                    <img src={HamburgerIcon} alt="hamburger icon"></img>
                </div>
                <div className="container">
                    <DragDropContext>
                        <Droppable droppableId="tasks">
                            {(provided) => (

                                <div {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    height="200" width="780" className="table-of-columns" id="columns-list">
                                    {
                                        columnNames.map((item) => (
                                            <div className="board-column" style={{ border: "solid", margin: "5px" }}>
                                                <div className="board-title">
                                                        {item.columnName}
                                                </div>
                                                {
                                                    taskNames.map((taskItem, index) => (

                                                        taskItem.columnId === item.id && (
                                                            <Draggable onClick={(event) => onDragging.call(event)} key={taskItem.id} draggableId={taskItem.id} index={index}>
                                                                {(provided) => (
                                                                    <div className="content-div"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                        {taskItem.taskName}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                    )))
                                                }
                                            </div>
                                            
                                        ))
                                        
                                    }
                                    <div className="board-column">
                                        <div className="board-title">
                                            Create new column
                                        </div>
                                        <img src={PlusIcon} alt="plus icon"></img>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </BoardModal>
        </section >
    )
}

export default BoardDetails;