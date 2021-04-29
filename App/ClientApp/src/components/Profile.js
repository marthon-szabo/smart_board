import React, { useContext } from 'react';
import { UserDataContext } from "./contexts/UserDataContext";
import UnloadedPicture from "../images/unloaded_profile_picture.png";

import "./Profile.scss";

function Profile() {
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;
    const email = userData.email;
    const takenQuests = userData.takenQuests ? userData.takenQuests : 0;
    const doneQuests = userData.doneQuests ? userData.doneQuests : 0;
    const badges = userData.badges ? userData.badges : 0;
    return (
        <div>
            <div className="profile-header">
                <h1> Profile </h1>
            </div>
            <img className="profile-picture" src={UnloadedPicture} alt="Question mark for unloaded profile"></img>
            <div className="profile-content">
            <p><strong>Your username:</strong> {username}</p>
            <p><strong>Your email:</strong> {email}</p>
            <p><strong>Number of taken quests:</strong> {takenQuests} </p>
            <p><strong>Number of done quests:</strong> {doneQuests} </p>
                <p><strong>Number of your badges:</strong> {badges} </p>
                </div>
        </div>
        )
}

export default Profile;