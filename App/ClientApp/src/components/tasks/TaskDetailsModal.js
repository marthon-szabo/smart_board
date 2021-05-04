import React, { useContext, useState, useRef } from 'react';
import Modal from 'react-awesome-modal';
import Switch from "react-switch";
import Calendar from 'react-calendar';
import { TaskDetailsContext } from "../contexts/taskContexts/TaskDetailsContext";

import "./TaskDetailsModal.scss";
import 'react-calendar/dist/Calendar.css';

function TaskDetailsModal() {
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);

    const [changeNameState, setChangeNameState] = useState(false);
    const [changeDateState, setChangeDateState] = useState(false);
    const [changeDescriptionState, setChangeDescriptionState] = useState(false);
    const [changed, setChanged] = useState(false);
    const [value, onChange] = useState(new Date());
    const [checked, setChecked] = useState(taskDetails.isDone);

    const taskNameInput = useRef();
    const descriptionInput = useRef();

    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    const closeModalWindow = () => {
        console.log(changed);
        console.log(taskDetails.taskId);
        if (changed) {
            const data = JSON.stringify({
                id: taskDetails.id,
                columnId: taskDetails.columnId,
                taskName: taskDetails.taskName,
                deadline: taskDetails.deadline,
                isDone: checked,
                description: taskDetails.description
            })
            fetch(`boards/tasks`, {
                method: 'PATCH',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }
        setTaskDetails([]);
    }

    const setTaskNameInput = () => {
        setChangeNameState(true);
    }

    const changeTaskName = (event) => {
        if (event.keyCode === 13) {
            setChanged(true);
            const newData = {
                id: taskDetails.id,
                columnId: taskDetails.columnId,
                taskName: taskNameInput.current.value,
                deadline: taskDetails.deadline,
                isDone: checked,
                description: taskDetails.description
            };
            setTaskDetails(newData);
            setChangeNameState(false);
            console.log(changed);
        };
    }

    const setDeadlineInput = () => {
        setChangeDateState(true);
    }

    const changeDeadline = (event) => {
        console.log("adjeffed0");
        setChanged(true);
            const newData = {
                id: taskDetails.id,
                columnId: taskDetails.columnId,
                taskName: taskDetails.taskName,
                deadline: value.toString(),
                isDone: checked,
                description: taskDetails.description
            };
            setTaskDetails(newData);
            setChangeDateState(false);
    }

    const setDescriptionInput = () => {
        setChangeDescriptionState(true);
    }

    const changeDescription = (event) => {
        if (event.keyCode === 13) {
            setChanged(true);
            const newData = {
                id: taskDetails.id,
                columnId: taskDetails.columnId,
                taskName: taskDetails.taskName,
                deadline: taskDetails.deadline,
                isDone: checked,
                description: descriptionInput.current.value
            };
            setTaskDetails(newData);
            setChangeDescriptionState(false);
        };
    }

    return (
        <section>
            <Modal className="create-modal" visible={taskDetails.length == 0 ? false : true} width="400" height="350" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div>
                    <label>
                        Taskname:
                    </label>
                    {
                        changeNameState === true &&
                        <div>
                            <input id="changed-taskname" type="text" ref={taskNameInput} onKeyDown={(e) => changeTaskName(e)}></input>
                        </div>
                    }
                    {
                        changeNameState === false &&
                        <p onDoubleClick={setTaskNameInput}
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
                                onClickDay={(e) => changeDeadline(e)}
                            />
                        </div>
                    }
                    {
                        changeDateState === false &&
                        <p onDoubleClick={setDeadlineInput}
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
                            <textarea id="changed-description" style={{ height: "105px" }} ref={descriptionInput} onKeyDown={(e) => changeDescription(e)}></textarea>
                        </div>
                    }
                    {
                        changeDescriptionState === false &&
                        <p onDoubleClick={setDescriptionInput}
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