import { useState, useContext } from 'react';
import { UserDataContext } from "../contexts/userContexts/UserDataContext";

const ProfileDataUseForm = (validate) => {
    const [valuesData, setValuesData] = useState({
        newUsername: '',
        newEmail: ''
    });

    const [userData, setUserData] = useContext(UserDataContext);
    const [errorsData, setErrorsData] = useState({});

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
        console.log(errorsData);
    };

    return { handleChangeData, valuesData, handleSubmitData, errorsData };
}

export default ProfileDataUseForm;