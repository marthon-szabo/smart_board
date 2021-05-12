export default function ValidateUserInformation(values, username, email) {

    let errors = {};

    if (!values.newUsername) {
        errors.newUsername = "Username is required";
    } else if (values.newUsername === username) {
        errors.newUsername = "New username can't be the old one";
    }

    if (!values.newEmail) {
        errors.newEmail = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.newEmail = 'Email address is invalid';
    } else if (values.newEmail === email) {
        errors.newEmail = "New email can't be the old one";
    }

    return errors;
}