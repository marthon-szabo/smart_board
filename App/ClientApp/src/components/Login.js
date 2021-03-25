import React, { useContext } from 'react';
import Modal from 'react-awesome-modal';
import validate from './ValidateLoginInformation';
import useForm from './UserLoginForm';
import { LoginStateContext } from "./LoginStateContext";
import { RegisterStateContext } from "./RegisterStateContext";
import { CSRFTokenContext } from "./CSRFTokenContext";

import './Error.css';

function Login({ submitForm }) {
    const [loginState, setLoginState] = useContext(LoginStateContext);
    const [registerState, setRegisterState] = useContext(RegisterStateContext);
    const [token, setToken] = useContext(CSRFTokenContext);

    const closeLoginWindow = () => {
        setLoginState(false);
        setToken("");
        document.querySelector(".container.blurred-box").classList.remove("blurred-box");
    }

    const changeToRegistrationWindow = () => {
        setLoginState(false);
        setRegisterState(true);
        document.querySelector(".container").classList.add("blurred-box");
    }

    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );
        
    return (
        
            <section>
                <Modal className="login-modal" visible={loginState} style={{ background: "#fcd281" }} width="400" height="350" effect="fadeInRight" onClickAway={() => closeLoginWindow()}>
                <form style={{ padding: '5%' }} onSubmit={handleSubmit}>
                        <input type="hidden" name="csrf-token" value={loginState}></input>
                        <h3>Sign In</h3>
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

                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        <p className="forgot-password text-right">
                        Don't have a  <a href="#" onClick={() => changeToRegistrationWindow()}>registration</a> yet?
                        </p>
                    </form>
                </Modal>
            </section>
        );
}
export default Login;

