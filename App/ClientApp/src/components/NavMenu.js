import React, { useContext } from 'react';
import { LoginStateContext } from "./contexts/LoginStateContext";
import { RegisterStateContext } from "./contexts/RegisterStateContext";
import { CSRFTokenContext } from "./contexts/CSRFTokenContext";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import Register from "./Register";
import Login from "./Login";
import { Home } from "./Home";
import LandingPage from "./LandingPage";

import './NavMenu.css';


function NavMenu() {
    const [loginState, setLoginState] = useContext(LoginStateContext);
    const [registrationState, setRegistrationState] = useContext(RegisterStateContext);
    const [token, setToken] = useContext(CSRFTokenContext);
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);

    const openRegistrationWindow = () => {
        setRegistrationState(true);
        document.querySelector(".container").classList.add("blurred-box");
    }

    const openLoginWindow = () => {
        setLoginState(true);
        fetch('/user/token')
            .then(res => res.json())
            .then(data => setToken(data))
        document.querySelector(".container").classList.add("blurred-box");
    }

        return (
            <>
                {

                    loggedInUser === true &&
                    <LandingPage />
                }
                {
                    loggedInUser === false &&
                    <div>
                        <div className="container">
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
                            <Home />
                        </div>
                    
                    <Register />
                        <Login />
                        </div>
                }
                    
                
                
            
                    </>
    );
       
}

export default NavMenu;


        
