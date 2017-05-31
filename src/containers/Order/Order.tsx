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

import { FormInput } from '../../components/index';
import { setOrder } from '../../actions';

import './Order.css';
import { Validators } from '../../utils/index';

interface OrderProps extends FormComponentProps, RouteComponentProps<any> {
  order: Order;
  setOrder: (order: Order) => Action;
}

class OrderPage extends React.Component<OrderProps, any> {

  constructor(props: OrderProps) {
    super(props);

    this.state = {
      isNew: !this.props.match.params.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit({...values}: Order) {
    const order = this.props.order;

    this.props.setOrder({
      ...order,
      ...values,
    });
    this.props.history.push('/orders');
  }

  public render(): JSX.Element {
    const handleSubmit = this.props.handleSubmit;

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
        </div>
      </Jumbotron>
    );
  }
}

const OrderFormWrapper = reduxForm({
  form: 'order',
})(OrderPage);

const mapStateToProps: MapStateToProps<{order: Order}, RouteComponentProps<any>> =
  ({ orders }: {orders: Orders}, ownProps) => {
    const orderId = ownProps && ownProps.match.params.id;
    const order = orderId ? orders[orderId] : { id: uuid() } as Order;
    return {
      order,
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
