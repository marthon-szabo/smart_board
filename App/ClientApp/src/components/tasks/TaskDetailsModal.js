import React, { useContext, useState } from 'react';
import Modal from 'react-awesome-modal';
import Switch from "react-switch";
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

import "./TaskDetailsModal.scss";

function TaskDetailsModal() {
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);
    const [checked, setChecked] = useState(taskDetails.isDone);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    const closeModalWindow = () => {
        setTaskDetails([]);
    }

    return (
        <section>
            <Modal className="create-modal" visible={ taskDetails.length == 0 ? false : true } width="400" height="350" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div>
                    <label>
                        Taskname:
                    </label>
                    <p>
                        {taskDetails.taskName}
                    </p>
                </div>
                <div>
                    <label>
                        Deadline:
                    </label>
                    <p>
                        {taskDetails.deadline}
                    </p>
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                    <p>
                        {taskDetails.description}
                    </p>
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