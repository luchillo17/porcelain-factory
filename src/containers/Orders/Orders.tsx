import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel } from 'react-bootstrap';

import { SearchBar } from '..';
import { CustomTable } from '../../components';
import { filteredOrders } from '../../selectors';

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

  }

  public render(): JSX.Element {
    let OrderTable = CustomTable as new () => CustomTable<Order>;
    return (
      <Jumbotron>
        <div className="Orders">
          <Panel>
            <h1>Ordenes</h1>
          </Panel>
          <SearchBar />
          <OrderTable
            fields={this.state.fields}
            items={this.props.orders}
          />
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: filteredOrders(state),
});

const mapDispatchToProps = {};

export const Orders: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
