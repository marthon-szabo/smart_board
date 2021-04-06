import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { LoginStateProvider } from "./components/contexts/LoginStateContext";
import { RegisterStateProvider } from "./components/contexts/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/contexts/CSRFTokenContext";
import { LoggedInUserProvider } from "./components/contexts/LoggedInUserContext";
import { UserDataProvider } from "./components/contexts/UserDataContext";
import { CreateBoardProvider } from "./components/contexts/CreateBoardContext";
import { BoardStateProvider } from "./components/contexts/BoardStateContext";

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
      <CreateBoardProvider>
      <BoardStateProvider>
      <Layout>
      
      </Layout>
      </BoardStateProvider>
      </CreateBoardProvider>
      </UserDataProvider>
      </LoggedInUserProvider>
      </CSRFTokenContextProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
