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

import { map, omit } from 'lodash';
import { v1 as uuid } from 'uuid';

import { FormInput } from '../../components';
// import { filteredOrderItemsByOrder } from '../../selectors';
import { setOrderItem } from '../../actions';

import './OrderItem.css';
import { Validators } from '../../utils/index';

interface OrderItemProps extends FormComponentProps, RouteComponentProps<any> {
  order: Order;
  products: Products;
  orderItem: OrderItem;
  setOrderItem: (orderItem: OrderItem) => Action;
}

interface OrderItemState {
  id: string;
  isNew: boolean;
}

class OrderItemPage extends React.Component<OrderItemProps, OrderItemState> {

  constructor(props: OrderItemProps) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      isNew: !this.props.match.params.id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit({ ...values }: OrderItem) {
    const orderItem = this.props.orderItem;

    this.props.setOrderItem(
      omit(
      {
        ...orderItem,
        ...values,
      },
      'customer') as OrderItem
    );
    this.props.history.push(`/orders/${orderItem.orderId}`);
  }

  public render(): JSX.Element {
    const handleSubmit = this.props.handleSubmit;
    const products = this.props.products;
    return (
      <Jumbotron>
        <div className="Order">
          <Panel>
            <h1>{this.state.isNew ? 'Nueva ' : ''}Linea de Orden</h1>
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
                name="orderId"
                type="text"
                label="Id Orden"
                readOnly={true}
                component={FormInput}
              />
              <Field
                name="customer"
                type="text"
                label="Cliente"
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
                  Validators.minValueExclusive(0)
                ]}
              />

              <div className="formButtons">
                <Button bsStyle="primary" type="submit">Guardar</Button>
                {' '}
                <Button
                  bsStyle="danger"
                  onClick={() => this.props.history.push('/orders')}
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

const OrderItemFormWrapper = reduxForm({
  form: 'order',
})(OrderItemPage);

interface MapStateResult {
  order: Order;
  products: Products;
  orderItem: OrderItem;
}

type StateToProps = MapStateToProps<MapStateResult, RouteComponentProps<any>>;

const mapStateToProps: StateToProps =
  ({ orders, products, orderItems }: RXState, ownProps) => {
    const id = ownProps && ownProps.match.params.id;
    const orderId = ownProps && ownProps.match.params.orderId;

    const order = orders[ orderId ];
    const orderItem = id ? orderItems[ id ] : { id: uuid(), order, orderId } as OrderItem;

    return {
      order,
      products,
      orderItem,
      initialValues: {
        customer: order.customer,
        ...orderItem,
      }
    };
  };

const mapDispatchToProps = {
  setOrderItem,
};

export const OrderItem: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(OrderItemFormWrapper);
