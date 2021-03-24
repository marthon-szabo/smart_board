import { useState, useEffect } from 'react';

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

    useEffect(
        () => {
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
                    .then(data => data ? alert('Username is taken. Please try it again.') : alert('Successful registration!'))
            }
           
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default UseRegistrationForm;