import React, { useContext } from 'react';
import { UserDataContext } from "./contexts/UserDataContext";

function Profile() {
    const [userData, setUserData] = useContext(UserDataContext);
    const username = userData.username;
    const email = userData.email;
    const takenQuests = userData.takenQuests ? userData.takenQuests : 0;
    const doneQuests = userData.doneQuests ? userData.doneQuests : 0;
    const badges = userData.badges ? userData.badges : 0;
    return (
        <div>
            <p>Your username: {username}</p>
            <p>Your email: {email}</p>
            <p>Number of taken quests: {takenQuests} </p>
            <p>Number of done quests: {doneQuests} </p>
            <p>Number of your badges: {badges} </p>
        </div>
        )
}

export default Profile;