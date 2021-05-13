import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { LoginStateProvider } from "./components/contexts/userContexts/LoginStateContext";
import { RegisterStateProvider } from "./components/contexts/userContexts/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/contexts/userContexts/CSRFTokenContext";
import { LoggedInUserProvider } from "./components/contexts/userContexts/LoggedInUserContext";
import { UserDataProvider } from "./components/contexts/userContexts/UserDataContext";
import { CreateBoardProvider } from "./components/contexts/boardContexts/CreateBoardContext";
import { CreateColumnProvider } from "./components/contexts/columnContexts/CreateColumnContext";
import { CreateTaskProvider } from "./components/contexts/taskContexts/CreateTaskContext";
import { BoardStateProvider } from "./components/contexts/boardContexts/BoardStateContext";
import { DeleteBoardProvider } from "./components/contexts/boardContexts/DeleteBoardContext";
import { DeleteColumnConfirmationProvider } from "./components/contexts/columnContexts/DeleteColumnConfirmationContext";
import { DeleteTaskConfirmationProvider } from "./components/contexts/taskContexts/DeleteTaskConfirmationContext";
import { ColumnsProvider } from "./components/contexts/columnContexts/ColumnsContext";
import { TaskDetailsProvider } from "./components/contexts/taskContexts/TaskDetailsContext";
import { AvailableQuestDetailProvider } from "./components/contexts/questContexts/AvailableQuestDetailContext";

import './static/scss/custom.scss';
import './static/scss/App.scss';
import ChatClient from './components/chat/ChatClient';

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
      <DeleteTaskConfirmationProvider>
      <CreateColumnProvider>
      <CreateTaskProvider>
      <ColumnsProvider>
      <TaskDetailsProvider>
      <AvailableQuestDetailProvider>
      <Layout>
      
      </Layout>
<<<<<<< HEAD
     
=======
      </AvailableQuestDetailProvider>
>>>>>>> 77963b36b2407e60cd5dfebe646f062c68f1f740
      </TaskDetailsProvider>
      </ColumnsProvider>
      </CreateTaskProvider>
      </CreateColumnProvider>
      </DeleteTaskConfirmationProvider>
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
