import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LoginStateProvider } from "./components/LoginStateContext";
import { RegisterStateProvider } from "./components/RegisterStateContext";
import { CSRFTokenContextProvider } from "./components/CSRFTokenContext";
import { BlurStyleProvider } from "./BlurStyleContext";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
      <RegisterStateProvider>
      <LoginStateProvider>
      <CSRFTokenContextProvider>
      <BlurStyleProvider>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
      </BlurStyleProvider>
      </CSRFTokenContextProvider>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
