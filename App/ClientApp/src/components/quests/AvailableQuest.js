import React from 'react';

function AvailableQuest(props) {
    return (
            <div class="artboard">
                <div class="flippable-card">

                    <div class="flippable-card__side flippable-card__side--back">
                        <div class="flippable-card__cover">
                            <h4 class="flippable-card__heading">
                                <span class="flippable-card__heading-span">Skill Set</span>
                            </h4>
                        </div>
                        <div class="flippable-card__details">
                            <ul>
                                <li>Advanced JS and CSS</li>
                                <li>JS/CSS Preprocessors</li>
                                <li>JS Frameworks</li>
                                <li>Advanced Animations</li>
                                <li>Deployment Pipelines</li>
                                <li>Large Apps Architectures</li>
                                <li>Naming Conventions</li>
                            </ul>
                        </div>
                    </div>

                    <div class="flippable-card__side flippable-card__side--front">
                        <p class="flippable-card__title">Hello World!</p>
                    <img src={props.quest.picturePath} alt="quest logo"></img>
                    </div>

                </div>
            </div>
        )
}

export default AvailableQuest;