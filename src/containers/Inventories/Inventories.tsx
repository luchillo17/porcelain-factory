import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel } from 'react-bootstrap';

import { SearchBar } from '..';
import { CustomTable } from '../../components';
import { filteredInventories } from '../../selectors';

interface InventoriesProps extends RouteComponentProps<any> {
  inventories: Inventories;
}

class InventoriesPage extends React.Component<InventoriesProps, any> {

  constructor(props: InventoriesProps) {
    super(props);

    this.state = ({
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'productId',
          label: 'Id Producto',
        },
        {
          key: 'product.name',
          label: 'Nombre',
        },
        {
          key: 'quantity',
          label: 'Cantidad',
        },
        {
          key: 'reserved',
          label: 'Reservado',
        },
      ]  as Field[],
    });

  }

  public render(): JSX.Element {
    let InventoryTable = CustomTable as new () => CustomTable<Inventory>;
    return (
      <Jumbotron>
        <div className="Products">
          <Panel>
            <h1>Inventario</h1>
          </Panel>
          <SearchBar />
          <InventoryTable
            fields={this.state.fields}
            items={this.props.inventories}
          />
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  inventories: filteredInventories(state),
});

const mapDispatchToProps = {};

export const Inventories: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(InventoriesPage);
