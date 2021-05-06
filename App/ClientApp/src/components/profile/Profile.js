import React, { useContext, useState } from 'react';
import { UserDataContext } from "../contexts/userContexts/UserDataContext";
import UnloadedPicture from "../../images/unloaded_profile_picture.png";
import EditPicture from "../../images/pencil.png";
import useForm from "./ProfileUseForm";
import validate from "./ValidatePasswordInformation";

import "./Profile.scss";

function Profile() {
    const [userData, setUserData] = useContext(UserDataContext);

    const [changePassword, setChangePassword] = useState(false);
    const [succesfulChange, setSuccessfulChange] = useState(false);

    const username = userData.username;
    const email = userData.email;
    const takenQuests = userData.takenQuests ? userData.takenQuests : 0;
    const doneQuests = userData.doneQuests ? userData.doneQuests : 0;
    const badges = userData.badges ? userData.badges : 0;

    const { handleChange, values, handleSubmit, errors } = useForm(
        validate,
        setChangePassword,
        setSuccessfulChange
    );

    const showPasswordChanger = () => {
        setChangePassword(true);
        setSuccessfulChange(false);
    }


    return (
        <div className="profile-container">

            <div className="profile-header">
                <h1> Profile </h1>
            </div>
            <div className="profile-box">
                <img className="profile-picture" src={UnloadedPicture} alt="Question mark for unloaded profile"></img>
                <div className="profile-content">
                    <img className="edit-picture" src={EditPicture} alt="pencil for editing"></img>
                    <p><strong>Your username:</strong> {username}</p>
                    <p><strong>Your email:</strong> {email}</p>
                    <p><strong>Number of taken quests:</strong> {takenQuests} </p>
                    <p><strong>Number of done quests:</strong> {doneQuests} </p>
                    <p><strong>Number of your badges:</strong> {badges} </p>
                    {changePassword === false &&
                        <button className="password-changer-button" onClick={showPasswordChanger}>Change password</button>
                    }
                </div>
            </div>
            {changePassword === true &&
                <div className="password-changer-box">
                    <p className="change-title"><strong>Change password</strong></p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label>Old password:</label>
                            <input
                                type="password"
                                className="form-control profile-password"
                                name="oldPassword"
                                placeholder="Enter old password"
                                value={values.oldPassword}
                                onChange={handleChange}
                            />
                        {errors.oldPassword &&
                            <p className="password-error">{errors.oldPassword}</p>}
                        </div>
                        <div className="form-group">
                            <label>New password:</label>
                            <input
                                type="password"
                                className="form-control profile-password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={values.newPassword}
                                onChange={handleChange}
                            />
                        {errors.newPassword &&
                            <p className="password-error">{errors.newPassword}</p>}
                        </div>
                        <div className="form-group">
                            <label>New password again:</label>
                            <input
                                type="password"
                                className="form-control profile-password"
                                name="confirmedPassword"
                                placeholder="Enter new password again"
                                value={values.confirmedPassword}
                                onChange={handleChange}
                            />
                        {errors.confirmedPassword &&
                            <p className="password-error">{errors.confirmedPassword}</p>}
                        </div>
                        <button id="change-btn" type="submit" className="btn btn-primary btn-block profile-button">
                            Change
                    </button>
                    </form>
                </div>
            }
            {succesfulChange === true &&
                <div className="successful-change-box">
                    <p>Password has been changed successfully!</p>
                </div>
            }

        </div>
    )
}

export default Profile;