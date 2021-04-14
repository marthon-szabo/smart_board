import React, { useContext, useState } from 'react';
import { BoardStateContext } from "../contexts/BoardStateContext";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BoardModal from './BoardModalComponents/BoardModal';

import "./TableStyle.css";
import PlusIcon from "../../images/plus.png";


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
    const [taskId, setTaskId] = useState(null);

    const closeModalWindow = () => {
        setBoardState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    const handleClick = (e, data) => {
        console.log(data);
        setTaskId(data);
    }

    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId != destination.droppableId) {
            console.log(source);
            console.log(destination);
            console.log(taskId);
            for (let i = 0; i < taskNames.length; i++) {
                console.log(taskNames[i].id);
                if (taskNames[i].id === taskId) {
                    taskNames[i].columnId = destination.droppableId;
                }
            }
        }
    }

    async function getElementAsync(taskId) {
        return document.getElementById("addButton-" + taskId);
    }

    const showHiddenElements = async (e, id) => {
        getElementAsync(id).then(elemToShow => elemToShow.classList.remove("hidden"));
    }

    const hideHiddenElements = async (e, id) => {
        getElementAsync(id).then(elemToShow => elemToShow.classList.add("hidden"));
    }

    return (
        <section>
            <BoardModal className="create-modal" visible={boardState} width="800" height="600" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
               
                <div className="container">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div height="200" width="780" className="table-of-columns" id="columns-list">
                            {
                                columnNames.map((item) => (
                                    <Droppable droppableId={ item.id}>
                            {(provided) => (

                                <div {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    >

                                                <div className="board-column" id={ item.id } onMouseEnter={(e) => showHiddenElements(e, item.id) } onMouseLeave={(e) => hideHiddenElements(e, item.id) } style={{ border: "solid", margin: "5px" }}>
                                                <div className="board-title">
                                                        {item.columnName}
                                                </div>
                                                    {
                                                        taskNames.map((taskItem, index) => (

                                                            taskItem.columnId === item.id && (
                                                                <div id={taskItem.id} onMouseDown={((e) => handleClick(e, taskItem.id))}>
                                                            <Draggable key={taskItem.id} draggableId={taskItem.id} index={index} >
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
                                                                    
                                                            </div>
                                                        )))
                                                        
                                                    }<img className="add-image hidden" id={"addButton-" + item.id} src={PlusIcon} alt="plus icon"></img>{provided.placeholder}
                                            </div>
                                </div>
                            )}
                                    </Droppable>
                                ))}
                            <img src={PlusIcon} alt="plus icon" style={{ height: "30px", display: "block", marginTop:"5px" }} title="Click here to add a new column"></img>
                        </div>
                        
                    </DragDropContext>
                    
                </div>
            </BoardModal>
        </section >
    )
}

export default BoardDetails;