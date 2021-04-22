import React, { Component } from 'react';
import logo from "../images/smartboard.png"
import '../static/scss/Center.scss'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <img src={logo} alt="logo of the app" className="mainPicture"></img>
        <h1>Hello, visitor!</h1>
        <h2>Welcome to SmartBoards Application</h2>
        <p>This page was made to help users get more organized via using our unique smart boards. Functions are available after registration and login.</p>
      </div>
    );
  }
}
