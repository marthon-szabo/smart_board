import React, { useContext } from 'react';
import { UserDataContext } from "./contexts/userContexts/UserDataContext";
import QuestContainer from "./quests/QuestContainer";
import Profile from "./profile/Profile";
import News from "./News";
import BoardCollection from "./boards/BoardCollection";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import "./LandingHeader.scss";
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
                                    <Link to="/" className="button-link"><img src={NewsIcon} alt="News" style={IconStyle}></img>News</Link>
                                    </li>
                                <li style={SeparatedButtonStyle}>
                                    <Link to="/quests" className="button-link"><img src={QuestsIcon} alt="Quests" style={IconStyle}></img>Quests</Link>
                                </li>
                                <li style={SeparatedButtonStyle}>
                                    <Link to="/profile" className="button-link"><img src={ProfileIcon} alt="Profile" style={IconStyle}></img>My profile</Link>
                                </li>
                                <li style={SeparatedButtonStyle}>
                                    <Link to="/boards" className="button-link"><img src={BoardsIcon} alt="Profile" style={IconStyle}></img>My boards</Link>
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
                <Route path="/boards">
                    <BoardCollection />
                </Route>
                <Route path="/">
                    <News />
                </Route>
        </Switch>
        </Router>
        )
}

export default LandingHeader;