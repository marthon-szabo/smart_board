import React from 'react';

function AvailableQuest(props) {

    const openDetailModal = () => {
        alert("clicked " + props.quest.description);
    }

    return (
        <div class="artboard">
            <div class="flippable-card">
                <div class="flippable-card__side flippable-card__side--back">
                    <p>{props.quest.description}</p>
                    <button type="submit" onClick={openDetailModal}>Check details</button>
                </div>
                <div class="flippable-card__side flippable-card__side--front">
                    <p class="flippable-card__title">Quest!</p>
                    <img src={props.quest.picturePath} alt="quest logo"></img>
                </div>
            </div>
        </div>
    )
}

export default AvailableQuest;