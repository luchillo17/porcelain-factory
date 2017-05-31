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

import {v1 as uuid} from 'uuid';

import { FormInput, CustomTable } from '../../components';
import { filteredOrderItemsByOrder } from '../../selectors';
import { setOrder } from '../../actions';

import './Order.css';
import { Validators } from '../../utils/index';

interface OrderProps extends FormComponentProps, RouteComponentProps<any> {
  order: Order;
  orderItems: OrderItems;
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
          key: 'product.name',
          label: 'Nombre Producto',
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
            <div>
              <Panel>
                <h1>Lineas</h1>
              </Panel>
              <OrderItemTable
                fields={this.state.fields}
                items={this.props.orderItems}
                itemClick={this.handleClick}
              />
            </div>
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
  orderItems: OrderItems;
}

type StateToProps = MapStateToProps<MapStateResult, RouteComponentProps<any>>;

const mapStateToProps: StateToProps =
  (state: RXState, ownProps) => {
    const { orders } = state;
    const orderId = ownProps && ownProps.match.params.id;
    const order = orderId ? orders[orderId] : { id: uuid() } as Order;

    const filter = filteredOrderItemsByOrder({id: orderId} as Order);

    return {
      order,
      orderItems: filter(state),
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
