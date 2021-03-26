import { useState, useEffect } from 'react';
import { addSpinner, removeSpinner, removeSpinnerTextless } from '../Utilities/Spinner'; 
import addCheckMark from '../Utilities/CheckMark';
import check_mark from "../images/check_mark.png";
import x_mark from "../images/x_mark.png";

const UserLoginForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const enableLogin = (button) => {
        removeSpinnerTextless(button);
        addCheckMark(button, check_mark);
        setTimeout(() => {
            window.location.href = "https://localhost:5001/profile";
        }, 1000);

    };

    const disableLogin = (button, buttonText) => {
        removeSpinnerTextless(button);
        addCheckMark(button, x_mark)
        alert('Invalid username or password! Please try it again.');
        setTimeout(() => {
            button.innerHTML = buttonText;
        }, 2000);
    }

    const checkLogin = (data, button, buttonText) => {
        data ? enableLogin(button) : disableLogin(button, buttonText);
    }

    useEffect(
        () => {
            const button = document.querySelector("#login-btn");
            const buttonText = button.innerHTML;

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
                    .then(data => checkLogin(data, button, buttonText));
                
                addSpinner(button);
            }
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default UserLoginForm;