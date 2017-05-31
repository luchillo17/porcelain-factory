import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';
import { Action } from 'redux';
import { Field, reduxForm, FormComponentProps } from 'redux-form';
import {
  Jumbotron,
  Button,
  Panel,
} from 'react-bootstrap';

import { map } from 'lodash';
import {v1 as uuid} from 'uuid';

import { FormInput } from '../../components/index';
import { setInventory } from '../../actions';

import './Inventory.css';
import { Validators } from '../../utils/index';

interface InventoryProps extends FormComponentProps, RouteComponentProps<any> {
  products: Products;
  inventory: Inventory;
  setInventory: (inventory: Inventory) => Action;
}

class InventoryPage extends React.Component<InventoryProps, any> {

  constructor(props: InventoryProps) {
    super(props);

    this.state = {
      isNew: !this.props.match.params.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit({...values}: Inventory) {
    const inventory = this.props.inventory;

    this.props.setInventory({
      ...inventory,
      ...values,
    });
    this.props.history.push('/inventories');
  }

  public render(): JSX.Element {
    const handleSubmit = this.props.handleSubmit;

    const {
      products,
      // inventory: { productId },
    } = this.props;

    return (
      <Jumbotron>
        <div className="Inventory">
          <Panel>
            <h1>{this.state.isNew ? 'Nuevo ' : ''}Inventario</h1>
          </Panel>
          <Panel>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field
                name="id"
                type="text"
                label="Id"
                readOnly={true}
                component={FormInput}
              />
              <Field
                name="productId"
                type="text"
                label="Producto"
                componentClass="select"
                readOnly={true}
                validate={Validators.required}
                component={FormInput}
              >
                {
                  map(products, product => {
                    return (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    );
                  })
                }
              </Field>
              <Field
                name="quantity"
                type="number"
                label="Cantidad"
                component={FormInput}
                validate={[
                  Validators.required,
                  Validators.number,
                  Validators.minValueExclusive(0),
                ]}
              />
              <div className="formButtons">
                <Button bsStyle="primary" type="submit">Guardar</Button>
                {' '}
                <Button
                  bsStyle="danger"
                  onClick={() => this.props.history.push('/inventories')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Panel>
        </div>
      </Jumbotron>
    );
  }
}

const InventoryFormWrapper = reduxForm({
  form: 'inventory',
})(InventoryPage);

interface MapStateResult {
  inventory: Inventory;
  products: Products;
}

type StateToProps = MapStateToProps<MapStateResult, RouteComponentProps<any>>;

const mapStateToProps: StateToProps =
  ({ inventories, products }: RXState, ownProps) => {
    const inventoryId = ownProps && ownProps.match.params.id;
    const inventory = inventoryId ? inventories[inventoryId] : { id: uuid() } as Inventory;
    return {
      products,
      inventory,
      initialValues: {
        ...inventory,
      }
    };
  };

const mapDispatchToProps = {
  setInventory,
};

export const Inventory: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(InventoryFormWrapper);
