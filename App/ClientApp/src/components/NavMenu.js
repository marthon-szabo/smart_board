import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Register } from "./Register";
import { Login } from "./Login";
import Modal from 'react-awesome-modal';

import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
      this.state = {
          registrationVisible: false,
          loginVisible: false,
          collapsed: true
      }
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.closeModalRegistration = this.closeModalRegistration.bind(this);
      this.openModalRegistration = this.openModalRegistration.bind(this);
      this.closeModalLogin = this.closeModalLogin.bind(this);
      this.openModalLogin = this.openModalLogin.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }

    openModalRegistration() {
        this.setState({
            registrationVisible: true
        })
        this.setState({
            loginVisible: false
        });
    }

    closeModalRegistration() {
        this.setState({
            registrationVisible: false
        });
    }

    openModalLogin() {
        this.setState({
            loginVisible: true
        })
        this.setState({
            registrationVisible: false
        });
    }

    closeModalLogin() {
        this.setState({
            loginVisible: false
        });
    }


    render() {
    return (
        <header>
            <div className="container-fluid main">
                <div className="text-center main-text">
                    <div className="c2a-btn footer-c2a-btn">
                        <div className="btn-group btn-group-lg" role="group" aria-label="Call to action">
                            <a type="button" class="btn btn-default btn-lg" onClick={() => this.openModalRegistration()}>Sign up</a>
                            <span className="btn-circle btn-or">or</span>
                            <a type="button" class="btn btn-default btn-lg" onClick={() => this.openModalLogin()}>Sign in</a>
                        </div>
                    </div>
                </div>
            </div>
            <Register visible={this.state.registrationVisible} />
            <Login visible={this.state.loginVisible} />
      </header>
    );
  }
}
