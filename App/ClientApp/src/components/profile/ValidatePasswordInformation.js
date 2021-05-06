export default function ValidatePasswordIndormation(values) {
    let errors = {};

    if (!values.oldPassword.trim()) {
        errors.oldPassword = 'Old password required';
    } else if (values.oldPassword === values.newPassword) {
        errors.oldPassword = 'New password can not be the old one';
    }

    if (!values.newPassword) {
        errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 6) {
        errors.newPassword = 'New password needs to be 6 characters or more';
    }

    if (!values.confirmedPassword) {
        errors.confirmedPassword = 'Confirming password is required';
    } else if (values.confirmedPassword !== values.newPassword) {
        errors.confirmedPassword = 'Passwords do not match';
    }

    return errors;
}