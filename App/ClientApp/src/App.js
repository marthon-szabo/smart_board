import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LoginStateProvider } from "./components/LoginStateContext";
import { RegisterStateProvider } from "./components/RegisterStateContext";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
      <RegisterStateProvider>
      <LoginStateProvider>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
      </LoginStateProvider>
      </RegisterStateProvider>
    );
  }
}
