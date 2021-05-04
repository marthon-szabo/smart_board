import React, { useContext } from 'react';
import { UserDataContext } from "./contexts/userContexts/UserDataContext";
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
        <div className="profile-container">
            <div className="profile-header">
                <h1> Profile </h1>
            </div>
            <div className="profile-box">
                <img className="profile-picture" src={UnloadedPicture} alt="Question mark for unloaded profile"></img>
                <div className="profile-content">
                    <p><strong>Your username:</strong> {username}</p>
                    <p><strong>Your email:</strong> {email}</p>
                    <p><strong>Number of taken quests:</strong> {takenQuests} </p>
                    <p><strong>Number of done quests:</strong> {doneQuests} </p>
                    <p><strong>Number of your badges:</strong> {badges} </p>
                </div>
            </div>
            <div className="password-changer-box">
                <p className="change-title"><strong>Change password</strong></p>
                <form>
                    <div className="form-group">
                        <label>Old password:</label>
                        <input
                            type="password"
                            className="form-control profile-password"
                            name="old-password"
                            placeholder="Enter old password"
                        />
                    </div>
                    <div className="form-group">
                        <label>New password:</label>
                        <input
                            type="password"
                            className="form-control profile-password"
                            name="new-password"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="form-group">
                        <label>New password again:</label>
                        <input
                            type="password"
                            className="form-control profile-password"
                            name="confirm-password"
                            placeholder="Enter new password again"
                        />
                    </div>
                    <button id="change-btn" type="submit" className="btn btn-primary btn-block profile-button">
                        Change
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile;