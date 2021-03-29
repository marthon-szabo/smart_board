import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { LoginStateProvider } from "./components/contexts/LoginStateContext";
import { RegisterStateProvider } from "./components/contexts/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/contexts/CSRFTokenContext";
import { LoggedInUserProvider } from "./components/contexts/LoggedInUserContext";
import { UserDataProvider } from "./components/contexts/UserDataContext";

import './custom.css';
import './App.scss';
export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
      <RegisterStateProvider>
      <LoginStateProvider>
      <CSRFTokenContextProvider>
      <LoggedInUserProvider>
      <UserDataProvider>
      <Layout>
            
      </Layout>
      </UserDataProvider>
      </LoggedInUserProvider>
      </CSRFTokenContextProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
