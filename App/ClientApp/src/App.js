import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LoginStateProvider } from "./components/LoginStateContext";
import { RegisterStateProvider } from "./components/RegisterStateContext";
import { CSRFTokenProvider } from "./components/CSRFTokenContext";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
      <RegisterStateProvider>
      <LoginStateProvider>
      <CSRFTokenProvider>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
      </CSRFTokenProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
