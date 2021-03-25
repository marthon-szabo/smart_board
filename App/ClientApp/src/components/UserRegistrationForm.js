import { useState, useEffect } from 'react';
import { addSpinner, removeSpinner } from '../Utilities/Spinner'; 

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

    const checkRegistration = (data, button, buttonText) => {
        data ? alert('Username is taken. Please try it again.') : alert('Successful registration!');
        removeSpinner(button, buttonText);
    }

    useEffect(
        () => {
            
            const button = document.querySelector("#register-btn");
            const buttonText = button.innerHTML;

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
                    .then(data => checkRegistration(data, button, buttonText));

                addSpinner(button);
            }
           
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default UseRegistrationForm;