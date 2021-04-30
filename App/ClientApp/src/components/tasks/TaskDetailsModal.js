import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import Switch from "react-switch";
import Calendar from 'react-calendar';
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

import "./TaskDetailsModal.scss";
import 'react-calendar/dist/Calendar.css';
import Task from './Task';

function TaskDetailsModal() {
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);
    
    const [changeNameState, setChangeNameState] = useState(false);
    const [changeDateState, setChangeDateState] = useState(false);
    const [changeDescriptionState, setChangeDescriptionState] = useState(false);
    const [value, onChange] = useState(new Date());
    const [checked, setChecked] = useState(taskDetails.isDone);

    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    const closeModalWindow = () => {
        setTaskDetails([]);
    }

    const switchToInput = (event, task) => {
        const title = event.target;
        const titleName = title.innerHTML;

        const inputField = document.createElement("input")
        inputField.setAttribute("type", "text");
        inputField.value = titleName;
        inputField.className = "column-input";

        document.addEventListener("click", () => {
            title.innerHTML = titleName;
        });

        inputField.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                title.innerHTML = inputField.value;
            }
        });

        title.innerHTML = "";
        title.appendChild(inputField);
        inputField.focus();
        inputField.select();
    }

    const changeTaskName = (e) => {
        setChangeNameState(true);

        const inputField = document.getElementById("changed-taskname");
        console.log(inputField);

        document.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                console.log(taskDetails);
                const newData = {
                    taskId: taskDetails.taskId,
                    columnId: taskDetails.columnId,
                    taskName: inputField.value,
                    deadline: taskDetails.deadline,
                    isDone: taskDetails.isDone,
                    description: taskDetails.description
                };
                setTaskDetails(newData);
                setChangeNameState(false);
            }
        });
    }

    const changeDeadline = (e) => {
        setChangeDateState(true);
        const inputField = document.getElementById("changed-date");
        inputField.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                const newData = {
                    taskId: taskDetails.taskId,
                    columnId: taskDetails.columnId,
                    taskName: taskDetails.taskName,
                    deadline: value.toString(),
                    isDone: taskDetails.isDone,
                    description: taskDetails.description
                };
                setTaskDetails(newData);
                setChangeDateState(false);
            }
        });
    }

    const changeDescription = (e) => {
        setChangeDescriptionState(true);
        
        document.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                const inputField = document.getElementById("changed-description");
                const newData = {
                    taskId: taskDetails.taskId,
                    columnId: taskDetails.columnId,
                    taskName: taskDetails.taskName,
                    deadline: taskDetails.deadline,
                    isDone: taskDetails.isDone,
                    description: inputField.value
                };
                setTaskDetails(newData);
                setChangeDescriptionState(false);
            }
        });
    }

    return (
        <section>
            <Modal className="create-modal" visible={ taskDetails.length == 0 ? false : true } width="400" height="350" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div>
                    <label>
                        Taskname:
                    </label>
                    {
                        changeNameState === true &&
                        <div>
                            <input id="changed-taskname" type="text"></input>
                        </div>
                    }
                    {
                        changeNameState === false &&
                        <p onDoubleClick={(e) => changeTaskName(e)}
                            title="Double click to change">
                            {taskDetails.taskName}
                        </p>
                    }
                    
                </div>
                <div>
                    <label>
                        Deadline:
                    </label>
                    {
                        changeDateState === true &&
                        <div>
                            <Calendar
                                id="changed-date"
                                onChange={onChange}
                                value={value}
                                locale="en-EN"
                            />
                        </div>
                    }
                    {
                        changeDateState === false &&
                        <p onDoubleClick={(e) => changeDeadline(e)}
                            title="Double click to change">
                            {taskDetails.deadline}
                        </p>
                    }
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                    {
                        changeDescriptionState === true &&
                        <div>
                            <textarea id="changed-description" style={{ height: "105px" }}></textarea>
                        </div>
                    }
                    {
                        changeDescriptionState === false &&
                        <p onDoubleClick={(e) => changeDescription(e)}
                            title="Double click to change">
                            {taskDetails.description}
                        </p>
                    }
                </div>
                <div>
                    <label>
                        Finished:
                    </label>
                    <p>
                        {checked ? "yes" : "no"}
                        <Switch
                            onChange={handleChange}
                            checked={checked}
                            className="react-switch"
                        />
                    </p>
                </div>
            </Modal>
        </section>
        )
}

export default TaskDetailsModal;