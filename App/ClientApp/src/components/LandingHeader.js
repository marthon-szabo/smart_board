import React from 'react';
import QuestContainer from "./quests/QuestContainer";
import Profile from "./Profile";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import "./LandingHeader.css"

function LandingHeader() {
    return (
        <div className="main-header">
            <div className="welcome-sign">
                <h3>Welcome</h3>
            </div>
            <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <div className="Quests">
                                <li>
                                    <Link to="/quests">Quests</Link>
                                </li>
                                </div>
                                <div className="Profile">
                                    <li>
                                        <Link to="/profile">My profile</Link>
                                    </li>
                                </div>
                        </ul>
                    </nav>

                    <Switch>

                        <Route path="/quests">
                            <QuestContainer />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>

                    </Switch>
                </div>
                </Router>
                </div>
            <div className="date-container">
                <p className="date">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
        )
}

export default LandingHeader;