import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import validate from './ValidateRegistrationInformation';
import useForm from './UserRegistrationForm';
import { RegisterStateContext } from "../contexts/RegisterStateContext";
import { LoginStateContext } from "../contexts/LoginStateContext";
import { CSRFTokenContext } from "../contexts/CSRFTokenContext";

import '../Error.css';

function Register({ submitForm }) {
    const [registerState, setRegisterState] = useContext(RegisterStateContext);
    const [loginState, setLoginState] = useContext(LoginStateContext);
    const [token, setToken] = useContext(CSRFTokenContext);

    const closeRegisterWindow = () => {
        setRegisterState(false);
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    const changeToLoginWindow = () => {
        setLoginState(true);
        setRegisterState(false);
        fetch('/user/token')
            .then(res => res.json())
            .then(data => setToken(data))
        document.querySelector(".container").classList.add("blurred-box");
    }

    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );


        return (
            <section>
                <Modal className="register-modal" visible={registerState} style={{ background: "#fcd281" }} width="400" height="550" effect="fadeInLeft" onClickAway={() => closeRegisterWindow()}>
                    <form style={{ padding: '5%' }} onSubmit={handleSubmit}>
                        <div className="register-head">
                            <h3>Sign Up</h3>
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name='username'
                                placeholder="Enter username"
                                value={values.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p>{errors.username}</p>}
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>

                            <div class="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                class="form-control"
                                name="password2"
                                placeholder="Confirm Password "
                                value={values.password2}
                                onChange={handleChange}
                            />
                            {errors.password2 && <p>{errors.password2}</p>}
                        </div>
                        <button id="register-btn" type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                        Already registered? <a href="#" onClick={() => changeToLoginWindow() }>sign in</a>!
                        </p>
                    </form>
                </Modal>
            </section>
        );
    }
export default Register;