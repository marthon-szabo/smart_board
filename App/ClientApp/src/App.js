import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { LoginStateProvider } from "./components/LoginStateContext";
import { RegisterStateProvider } from "./components/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/CSRFTokenContext";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
      <RegisterStateProvider>
      <LoginStateProvider>
      <CSRFTokenContextProvider>
      <Layout>
        
      </Layout>
      </CSRFTokenContextProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
