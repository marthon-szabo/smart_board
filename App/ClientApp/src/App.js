import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { LoginStateProvider } from "./components/contexts/LoginStateContext";
import { RegisterStateProvider } from "./components/contexts/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/contexts/CSRFTokenContext";
import { LoggedInUserProvider } from "./components/contexts/LoggedInUserContext";
import { UserDataProvider } from "./components/contexts/UserDataContext";
import { CreateBoardProvider } from "./components/contexts/CreateBoardContext";
import { BoardStateProvider } from "./components/contexts/BoardStateContext";
import { DeleteBoardProvider } from "./components/contexts/DeleteBoardContext";
import { DeleteColumnConfirmationProvider } from "./components/contexts/DeleteColumnConfirmationContext";
import { DeleteConfirmationProvider } from "./components/contexts/DeleteTaskConfirmationContext";

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
      <DeleteBoardProvider>
      <BoardStateProvider>
      <DeleteColumnConfirmationProvider>
      <Layout>
      
      </Layout>
      </DeleteColumnConfirmationProvider>
      </BoardStateProvider>
      </DeleteBoardProvider>
      </CreateBoardProvider>
      </UserDataProvider>
      </LoggedInUserProvider>
      </CSRFTokenContextProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
