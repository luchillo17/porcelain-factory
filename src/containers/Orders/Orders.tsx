import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel, Button } from 'react-bootstrap';

import { SearchInput } from '..';
import { CustomTable } from '../../components';
import { filteredOrders } from '../../selectors';
import { LinkContainer } from 'react-router-bootstrap';

interface OrdersProps extends RouteComponentProps<any> {
  orders: Orders;
}

class OrdersPage extends React.Component<OrdersProps, any> {

  constructor(props: OrdersProps) {
    super(props);

    this.state = ({
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'customer',
          label: 'Cliente',
        },
        {
          key: 'address',
          label: 'Dirección',
        },
        {
          key: 'quantity',
          label: 'Cantidad',
        },
        {
          key: 'total',
          label: 'Total',
        },
      ]  as Field[],
    });

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(key: string) {
    this.props.history.push(`/orders/${key}`);
  }

  public render(): JSX.Element {
    let OrderTable = CustomTable as new () => CustomTable<Order>;
    return (
      <Jumbotron>
        <div className="Orders">
          <Panel>
            <h1>Ordenes</h1>
          </Panel>
          <Panel className="utility-toolbar">
            <LinkContainer to="/orders/new">
              <Button>Nueva orden</Button>
            </LinkContainer>
            <SearchInput />
          </Panel>
          <OrderTable
            fields={this.state.fields}
            items={this.props.orders}
            itemClick={this.handleClick}
          />
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps: MapStateToProps<{orders: Orders}, RouteComponentProps<any>> = (state, ownProps) => ({
  orders: filteredOrders(state),
});

const mapDispatchToProps = {};

export const Orders: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
