import React from 'react';

function AvailableQuest(props) {

    const openDetailModal = () => {
        alert("clicked " + props.quest.description);
    }

    return (
        <div className="artboard">
            <div className="flippable-card">
                <div className="flippable-card__side flippable-card__side--back">
                    <div className="flippable-card__theme">
                        <p>{props.quest.description}</p>
                        <button type="submit" onClick={openDetailModal}>Check details</button>
                    </div>
                </div>
                <div className="flippable-card__side flippable-card__side--front">
                    <div className="flippable-card__theme">
                        <p className="flippable-card__title">Quest!</p>
                        <div>
                            <img className="quest-badge" src={props.quest.picturePath} alt="quest logo"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvailableQuest;