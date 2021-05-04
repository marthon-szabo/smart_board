import React, { useContext } from 'react';
import { AvailableQuestDetailContext } from "../contexts/questContexts/AvailableQuestDetailContext";

function AvailableQuest(props) {

    const [openState, setOpenState] = useContext(AvailableQuestDetailContext);

    const openDetailModal = () => {
        setOpenState(props.quest);
        document.querySelector(".container").classList.add("blurred-box");
    }

    return (
        <div className="artboard">
            <div className="flippable-card">
                <div className="flippable-card__side flippable-card__side--back">
                    <div className="flippable-card__theme">
                        <p>{props.quest.description}</p>
                        <button
                            className={props.quest.id % 2 == 0 ? "even-button" : "odd-button"}
                            type="submit"
                            onClick={openDetailModal}
                        >Check details</button>
                    </div>
                </div>
                <div className="flippable-card__side flippable-card__side--front">
                    <div className="flippable-card__theme">
                        <p className="flippable-card__title">Quest!</p>
                        <div className="image-container">
                            <img className="quest-badge" src={props.quest.picturePath} alt="quest logo"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvailableQuest;