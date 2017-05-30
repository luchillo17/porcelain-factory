import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel } from 'react-bootstrap';

interface OrderProps extends RouteComponentProps<any> {
  order: Order;
}

class OrderPage extends React.Component<OrderProps, any> {

  constructor(props: OrderProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Jumbotron>
        <div className="Orders">
          <Panel>
            <h1>Orden</h1>
          </Panel>

        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps: MapStateToProps<{order: Order}, RouteComponentProps<any>> =
  ({ orders }: {orders: Orders}, ownProps) => {
    let orderId = ownProps && ownProps.match.params.id;
    let order = orderId ? orders[orderId] : {} as Order;
    return {
      order,
    };
  };

const mapDispatchToProps = {};

export const Order: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(OrderPage);
