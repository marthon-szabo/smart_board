import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

function TaskDetailsModal() {
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);
    const deadlineString = taskDetails.deadline;
    const deadline = typeof deadlineString === "string" ? deadlineString.split('T')[0] : "";

    const closeModalWindow = () => {
        setTaskDetails([]);
    }

    return (
        <section>
            <Modal className="create-modal" visible={taskDetails.length == 0 ? false : true} width="400" height="250" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div>
                    <label><strong>Task name:</strong></label>
                    <p> {taskDetails.taskName} </p>
                </div>
                <div>
                    <label><strong>Deadline:</strong></label>
                    <p> {deadline} </p>
                </div>
                <div>
                    <label><strong>Description:</strong></label>
                    <p> {taskDetails.description} </p>
                </div>
            </Modal>
        </section>
        )
}

export default TaskDetailsModal;