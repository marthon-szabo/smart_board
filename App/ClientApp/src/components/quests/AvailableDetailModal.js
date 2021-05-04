﻿import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import { AvailableQuestDetailContext } from "../contexts/questContexts/AvailableQuestDetailContext";

function AvailableDetailModal() {

    const [openState, setOpenState] = useContext(AvailableQuestDetailContext);

    const TakeStyle = {
        backgroundColor: "#32c671",
        borderColor: "#32c671",
        border: "1px solid transparent",
        padding: "0.375rem 0.75rem"
    }

    const closeModalWindow = () => {
        setOpenState([]);
    }

    const takeQuest = () => {
        alert("take quest");
    }

    return (
        <Modal className="available-quest-modal" visible={openState.length == 0 ? false : true} width="400" height="335" effect="fadeInDown" onClickAway={() => closeModalWindow()}>
            <div style={{ padding: "0px 25px" }}>
                {openState.description}
                <button style={TakeStyle} id="delete-btn" type="submit" className="btn btn-primary btn-block" onClick={() => takeQuest()}>Take it!</button>
                <button id="cancel-btn" type="submit" className="btn btn-primary btn-block" onClick={() => closeModalWindow()}>Not now</button>
            </div>
        </Modal>
        )
}

export default AvailableDetailModal;