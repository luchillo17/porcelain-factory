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

import { mapKeys } from 'lodash';
import {v1 as uuid} from 'uuid';

import { FormInput, CustomTable } from '../../components';
import { getOrderItemsByOrder } from '../../selectors';
import { setOrder } from '../../actions';

import './Order.css';
import { Validators } from '../../utils/index';

interface OrderProps extends FormComponentProps, RouteComponentProps<any> {
  order: Order;
  orderItems: OrderItem[];
  setOrder: (order: Order) => Action;
}

interface OrderState {
  id: string;
  isNew: boolean;
  fields: TableField[];
}

class OrderPage extends React.Component<OrderProps, OrderState> {

  constructor(props: OrderProps) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      isNew: !this.props.match.params.id,
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'productId',
          label: 'Id producto',
        },
        {
          key: 'quantity',
          label: 'Cantidad',
        },
      ] as TableField[],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleSubmit({...values}: Order) {
    const order = this.props.order;

    this.props.setOrder({
      ...order,
      ...values,
    });
    this.props.history.push(`/orders/${values.id}`);
  }

  public handleClick(key: string) {
    if (this.state.isNew) { return; }
    this.props.history.push(`/orders/${this.state.id}/orderItems/${key}`);
  }

  public render(): JSX.Element {
    const handleSubmit = this.props.handleSubmit;

    const OrderItemTable = !this.state.isNew && CustomTable as new () => CustomTable<OrderItem>;

    return (
      <Jumbotron>
        <div className="Order">
          <Panel>
            <h1>{this.state.isNew ? 'Nueva ' : ''}Orden</h1>
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
                name="customer"
                type="text"
                label="Cliente"
                component={FormInput}
                validate={[Validators.required, Validators.minLength3]}
              />
              <Field
                name="address"
                type="text"
                label="Dirección"
                component={FormInput}
                validate={[Validators.required, Validators.minLength3]}
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
          {
            OrderItemTable &&
            <OrderItemTable
              fields={this.state.fields}
              items={mapKeys(this.props.orderItems, 'id')}
              itemClick={this.handleClick}
            />
          }
        </div>
      </Jumbotron>
    );
  }
}

const OrderFormWrapper = reduxForm({
  form: 'order',
})(OrderPage);

interface MapStateResult {
  order: Order;
  orderItems: OrderItem[];
}

type StateToProps = MapStateToProps<MapStateResult, RouteComponentProps<any>>;

const mapStateToProps: StateToProps =
  ({ orders, orderItems }: RXState, ownProps) => {
    const orderId = ownProps && ownProps.match.params.id;
    const order = orderId ? orders[orderId] : { id: uuid() } as Order;

    return {
      order,
      orderItems: getOrderItemsByOrder({id: orderId} as Order, orderItems),
      initialValues: {
        ...order,
      }
    };
  };

const mapDispatchToProps = {
  setOrder,
};

export const Order: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(OrderFormWrapper);
