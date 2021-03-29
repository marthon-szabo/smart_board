import React from 'react';
import AvailableQuests from "./AvailableQuests";
import FinishedQuests from "./FinishedQuests";
import TakenQuests from "./TakenQuests";

import '../NavMenu.css';
import './LandingPageContainers.css';

function QuestContainer() {
    return (
        <div className="container">
            <div className="available-quests">
                <AvailableQuests />
            </div>
            <div class="quest-container">
                <div className="taken-quests">
                    <TakenQuests />
                </div>
                <div className="finished-quests">
                    <FinishedQuests />
                </div>
            </div>
        </div>


    )
}
export default QuestContainer;
