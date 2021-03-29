import React from 'react';
import QuestContainer from "./quests/QuestContainer";
import Profile from "./Profile";
import News from "./News";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import "./LandingHeader.css"

function LandingHeader() {
    return (
        <Router>
        <div className="main-header">
            <div className="welcome-sign">
                <h3>Welcome</h3>
            </div>
            <div>
                <div>
                    <nav>
                            <ul>
                                <div className="News">
                                    <li>
                                        <Link to="/">News</Link>
                                    </li>
                                </div>
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

                    
                </div>
                </div>
            <div className="date-container">
                <p className="date">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
        <Switch>
            <Route path="/quests">
                <QuestContainer />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <News />
                </Route>

        </Switch>
        </Router>
        )
}

export default LandingHeader;