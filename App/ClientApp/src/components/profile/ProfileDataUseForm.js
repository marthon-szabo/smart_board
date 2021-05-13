import { useState, useContext, useEffect } from 'react';
import { UserDataContext } from "../contexts/userContexts/UserDataContext";

const ProfileDataUseForm = (validate, setProfileChangeData) => {
    const [valuesData, setValuesData] = useState({
        newUsername: '',
        newEmail: ''
    });

    const [userData, setUserData] = useContext(UserDataContext);
    const [errorsData, setErrorsData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChangeData = e => {
        const { name, value } = e.target;
        setValuesData({
            ...valuesData,
            [name]: value
        });
    };

    const handleSubmitData = (e) => {
        e.preventDefault();
        setErrorsData(validate(valuesData, userData.username, userData.email));

        setIsSubmitting(true);
    };

    const saveNewData = (newData) => {
        setUserData(newData);
        setProfileChangeData(false);
    }

    useEffect(
        () => {
            if (Object.keys(errorsData).length === 0 && isSubmitting) {
                const data = JSON.stringify({
                    username: userData.userName,
                    newUsername: valuesData.newUsername,
                    newEmail: valuesData.newEmail
                });
                fetch('/user/change-userdata', {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(response => response.json())
                    .then(data => saveNewData(data));
            }
        });

    return { handleChangeData, valuesData, handleSubmitData, errorsData };
}

export default ProfileDataUseForm;