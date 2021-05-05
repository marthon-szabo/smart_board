import React, { Component } from 'react';
import { Container } from 'reactstrap';
import  NavMenu  from './NavMenu';
import ChatClient from './chat/ChatClient';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <ChatClient />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
