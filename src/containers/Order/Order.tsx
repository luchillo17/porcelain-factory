import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
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

import { Validators } from '../../utils/';
import { SearchInput } from '..';

import './Order.css';

interface OrderProps extends FormComponentProps, RouteComponentProps<any> {
  id: string;
  isNew: boolean;
  order: Order;
  orderItems: OrderItems;
  setOrder: (order: Order) => Action;
}

interface OrderState {
  fields: TableField[];
}

const OrderItemTable = CustomTable as new () => CustomTable<OrderItem>;

class OrderPage extends React.Component<OrderProps, OrderState> {

  constructor(props: OrderProps) {
    super(props);

    this.state = {
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

    setTimeout(() => {
      this.props.history.push(`/orders/${values.id}`);
    });
  }

  public handleClick(key: string) {
    if (this.props.isNew) { return; }
    this.props.history.push(`/orders/${this.props.id}/orderItems/${key}`);
  }

  // public componentWillMount() {
  //   this.setState({
  //     ...this.state,
  //   });
  // }

  public render(): JSX.Element {
    return (
      <Jumbotron>
        <div className="Order">
          <Panel>
            <h1>{this.props.isNew ? 'Nueva ' : ''}Orden</h1>
          </Panel>
          <Panel>
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
            !this.props.isNew &&
            (<div>
              <Panel>
                <h1>Lineas</h1>
              </Panel>
              <Panel className="utility-toolbar">
                <LinkContainer to={`/orders/${this.props.id}/orderItems/new`}>
                  <Button>Nuevo inventario</Button>
                </LinkContainer>
                <SearchInput />
              </Panel>
              <OrderItemTable
                fields={this.state.fields}
                items={this.props.orderItems}
                itemClick={this.handleClick}
              />
            </div>)
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
  id: string;
  isNew: boolean;
  order: Order;
  orderItems: OrderItems;
}

type StateToProps = MapStateToProps<MapStateResult, RouteComponentProps<any>>;

const mapStateToProps: StateToProps =
  (state: RXState, ownProps) => {
    const { orders } = state;
    let isNew = false;
    let orderId = ownProps && ownProps.match.params.id;
    if (
      !orderId ||
      !orders[orderId]
    ) {
      orderId = uuid();
      isNew = true;
    }

    const order = !isNew ? orders[orderId] : { id: orderId } as Order;

    const filter = filteredOrderItemsByOrder({id: orderId} as Order);

    return {
      id: orderId,
      isNew,
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
