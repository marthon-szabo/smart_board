import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from "../contexts/userContexts/UserDataContext";

const ProfileUseForm = (validate, setChangePassword, setSuccessfulChange) => {
    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmedPassword: ''
    });

    const [userData, setUserData] = useContext(UserDataContext);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setValues({
            ...values,
            [name]: value
        });
        console.log(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));

        setIsSubmitting(true);
    };

    const handleResponse = (response) => {
        if (response.status === 200) {
            setChangePassword(false);
            setSuccessfulChange(true);
        } else if (response.status === 417) {
            setErrors({ oldPassword: "Password is not correct" });
        }
    }

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                const data = JSON.stringify({
                    username: userData.username,
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                });
                fetch('/user/change-password', {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(response => handleResponse(response));
            }
        });

    return { handleChange, values, handleSubmit, errors };
}

export default ProfileUseForm;