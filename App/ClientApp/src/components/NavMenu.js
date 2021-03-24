import React, { useState, useContext } from 'react';
import { LoginStateContext } from "./LoginStateContext";
import { RegisterStateContext } from "./RegisterStateContext";
import { CSRFTokenContext } from "./CSRFTokenContext";
import Register from "./Register";
import Login from "./Login";
import './NavMenu.css';


function NavMenu() {
    const [loginState, setLoginState] = useContext(LoginStateContext);
    const [registrationState, setRegistrationState] = useContext(RegisterStateContext);
    const [token, setToken] = useContext(CSRFTokenContext);

    const openRegistrationWindow = () => {
        setRegistrationState(true);
    }

    const openLoginWindow = () => {
        setLoginState(true);
        fetch('/user/token')
            .then(res => res.json())
            .then(data => setToken(data))
        console.log(token);
    }

        return (
            
        <header>
            <div className="container-fluid main">
                <div className="text-center main-text">
                    <div className="c2a-btn footer-c2a-btn">
                            <div className="btn-group btn-group-lg" role="group" aria-label="Call to action">
                                <a type="button" class="btn btn-default btn-lg" href="#" onClick={() => openRegistrationWindow()}>Sign up</a>
                            <span className="btn-circle btn-or">or</span>
                                <a type="button" class="btn btn-default btn-lg" href="#" onClick={() => openLoginWindow()}>Sign in</a>
                        </div>
                    </div>
                </div>
                </div>

                <Register/>
                <Login/>

                </header>
            
    );
       
}

export default NavMenu;


        
