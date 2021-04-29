import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { TaskDetailsContext } from "../contexts/TaskDetailsContext";

function TaskDetailsModal() {
    const [taskDetails, setTaskDetails] = useContext(TaskDetailsContext);

    const closeModalWindow = () => {
        setTaskDetails([]);
    }

    return (
        <section>
            <Modal className="create-modal" visible={ taskDetails.length == 0 ? false : true } width="400" height="250" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
                <div> {taskDetails.taskName} </div>
            </Modal>
        </section>
        )
}

export default TaskDetailsModal;