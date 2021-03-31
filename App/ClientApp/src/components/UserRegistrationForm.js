import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from "./contexts/UserDataContext";
import { addSpinner, removeSpinner } from '../Utilities/Spinner'; 
import { enableLogin, disableLogin } from "../Utilities/UserInteracrtionChecker";
import { LoggedInUserContext } from './contexts/LoggedInUserContext';

const UseRegistrationForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInUserContext);
    const [userDataState, setUserDataState] = useContext(UserDataContext);

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

    const proceedRegistration = (button) => {
        enableLogin(button);
    };

    const checkRegistration = (data, button, box, buttonText) => {
        const userDataFromResponse = {
            username: data.username,
            email: data.email,
            doneQuests: data.doneQuests,
            takenQuests: data.takenQuests,
            badges: data.badges

        }

        if(data.username != null) {
            enableLogin(button);
            setUserDataState(userDataFromResponse);
            setTimeout(() => {
                setIsLoggedIn(true);
            }, 1000);
        } else {
            disableLogin(button, buttonText, box, 'Username is taken. Please try it again.');
        }
    }

    useEffect(
        () => {
            const button = document.querySelector("#register-btn");
            const buttonText = button.innerHTML;
            const box = document.querySelector(".register-head");

            if (Object.keys(errors).length === 0 && isSubmitting) {
                const data = JSON.stringify({
                    Username: values.username,
                    Email: values.email,
                    Password: values.password
                })
                fetch('/user/register', {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(data => checkRegistration(data, button, box, buttonText));

                addSpinner(button);
            }
           
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default UseRegistrationForm;