import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import { addSpinner } from '../Utilities/Spinner'; 
import { enableLogin, disableLogin } from "../Utilities/UserInteracrtionChecker";
﻿import { useState, useEffect, useContext } from 'react';

const UserLoginForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInUserContext);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));

        setIsSubmitting(true);
    };

    const checkLogin = (data, button, box, buttonText) => {

        if(data) {
            enableLogin(button);

            setTimeout(() => {
                setIsLoggedIn(true);
            }, 1000);
        } else {
            disableLogin(button, buttonText, box, "Invalid username or password!");
        }
    }

    useEffect(
        () => {
            const button = document.querySelector("#login-btn");
            const buttonText = button.innerHTML;
            const box = document.querySelector(".login-head");

            if (Object.keys(errors).length === 0 && isSubmitting) {
                const data = JSON.stringify({
                    Username: values.username,
                    Password: values.password
                })
                fetch('/user/login', {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(data => checkLogin(data, button, box, buttonText));
                
                addSpinner(button);
            }
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default UserLoginForm;