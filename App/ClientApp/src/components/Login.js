﻿import React, { Component, useState, useContext } from 'react';
import Modal from 'react-awesome-modal';
import { LoginStateContext } from "./LoginStateContext";

function Login() {
    const [loginState, setLoginState] = useContext(LoginStateContext);

    const closeLoginWindow = () => {
        console.log(loginState)
        setLoginState(false);
        console.log(loginState)
    }
        
    return (
        
            <section>
                <Modal className="login-modal" visible={loginState} style={{ background: "#fcd281" }} width="400" height="600" effect="fadeInLeft" onClickAway={() => closeLoginWindow()}>
                    <form style={{ padding: '5%' }}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>


                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Don't have a  <a href="#">registration</a> yet?
                        </p>
                    </form>
                </Modal>
            </section>
        );
}
export default Login;

