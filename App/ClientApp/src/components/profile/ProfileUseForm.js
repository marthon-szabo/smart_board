import { useState } from 'react';

const ProfileUseForm = (callback, validate) => {
    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmedPassword: ''
    });

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

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
    };

    return { handleChange, values, handleSubmit, errors };
}

export default ProfileUseForm;