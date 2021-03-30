import React, { useContext } from 'react';
import { UserDataContext } from "./contexts/UserDataContext";
import QuestContainer from "./quests/QuestContainer";
import Profile from "./Profile";
import News from "./News";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import "./LandingHeader.css";
import ProfileIcon from "../images/profile.png";
import NewsIcon from "../images/news.png";
import QuestsIcon from "../images/quests.png";
import BoardsIcon from "../images/boards.png";

const SeparatedButtonStyle = {
    fontSize: 20,
    display: "inline-block",
    padding: "3px",
    marginLeft: "5px",
    marginRight: "5px",
    textDecoration: "none",
    opacity: "0.6",
    height: "35px",
};

const IconStyle = {
    height: "35px"
};

function LandingHeader() {
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;
    return (
        <Router>
        <div className="main-header">
            <div className="welcome-sign">
                    <h3>Welcome { username }</h3>
            </div>
            <div className="nav-menu-elements">
                <div>
                        <nav>
                            <ul>
                                <li style={SeparatedButtonStyle}>
                                    <img src={NewsIcon} alt="News" style={IconStyle}></img>
                                    <Link to="/">News</Link>
                                    </li>
                                <li style={SeparatedButtonStyle}>
                                    <img src={QuestsIcon} alt="Quests" style={IconStyle}></img>
                                    <Link to="/quests">Quests</Link>
                                </li>
                                <li style={SeparatedButtonStyle}>
                                    <img src={ProfileIcon} alt="Profile" style={ IconStyle }></img>
                                    <Link to="/profile">My profile</Link>
                                </li>
                                
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