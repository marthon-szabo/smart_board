﻿import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import Calendar from 'react-calendar';
import { CreateTaskContext } from "../contexts/CreateTaskContext";

import 'react-calendar/dist/Calendar.css';
import './CreateTaskModal.scss';

function CreateTaskModal() {

    const [openState, setOpenState] = useContext(CreateTaskContext);
    const [value, onChange] = useState(new Date());

    const closeModalWindow = () => {
        setOpenState("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const name = document.getElementById("task-name").value;
        const description = document.getElementById("task-description").value;
        const data = JSON.stringify({
            TaskName: name,
            Description: description,
            Deadline: value,
            ColumnId: openState,
            Id: name
        })
        fetch(`boards/${openState}/tasks`, {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => console.log(data));
        closeModalWindow();
    }

    return (
        <section>
            <Modal className="create-modal" visible={openState.length == 0 ? false : true} width="400" height="670" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                
                <form id="create-task-form" style={{ padding: '5%' }} onSubmit={(e) => handleSubmit(e) }>
                    <div className="container">
                        <div className="create-task-head">
                            <h3>Create a task for <strong>{openState}</strong></h3>
                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <Calendar
                                onChange={onChange}
                                value={value}
                                locale="en-EN"
                            />
                        </div>
                        <div className="form-group">
                            <label>Task name:</label>
                            <input
                                id="task-name"
                                type="text"
                                className="form-control"
                                name='board-name'
                                placeholder="Enter task's name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea id="task-description" style={{ height: "105px" }} className="form-control" name='Description' placeholder="Write a description here"/>
                        </div>
                        <button id="task-btn" type="submit" className="btn btn-primary btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
        )
}

export default CreateTaskModal;
