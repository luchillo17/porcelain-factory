import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import './App.css';

const logo = require('../../logo.svg');

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Fabrica de porcelana</h2>
        </div>
        <p className="App-intro">
          Este es el modulo comercial de la aplicacion de la
          Fabrica de porcelana, en este modulo puede manejar
          su lista de productos, inventario y envio.
        </p>

        <h2>
          Paginas
        </h2>

        <Nav bsStyle="pills" stacked={true} >
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
      </div>
    );
  }
}
