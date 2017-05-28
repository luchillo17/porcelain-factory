import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component<{}, null> {
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
          Paginas:
        </h2>

        <ListGroup>
          <ListGroupItem href="/products">
            Productos
          </ListGroupItem>
          <ListGroupItem href="/inventory">
            Inventario
          </ListGroupItem>
          <ListGroupItem href="/orders">
            Ordenes
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default App;
