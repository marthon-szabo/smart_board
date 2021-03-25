import React from 'react';
import LandingHeader from "./LandingHeader";
import AvailableQuests from "./quests/AvailableQuests";
import FinishedQuests from "./quests/FinishedQuests";
import TakenQuests from "./quests/TakenQuests";

import './NavMenu.css';
import './LandingPageContainers.css';

function LandingPage() {
    return (
        <div className="container">
            <LandingHeader/>
            Landing page for logged in user
            <div className="available-quests">
                <AvailableQuests/>
            </div>
            <div class="quest-container">
                <div className="taken-quests">
                    <TakenQuests/>
                </div>
                <div className="finished-quests">
                    <FinishedQuests/>
                </div>
            </div>
        </div>
        

        )
}
export default LandingPage;