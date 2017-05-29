import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';

const logo = require('../../logo.svg');

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <Navbar
          inverse={true}
        >

          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a href="#">
                  <img src={logo} className="App-logo" alt="logo" />
                  Fabrica de porcelana
                </a>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav
              bsStyle="pills"
            >
              <LinkContainer to="/products">
                <NavItem>
                  Productos
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/inventory">
                <NavItem>
                  Inventario
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/orders">
                <NavItem>
                  Ordenes
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
