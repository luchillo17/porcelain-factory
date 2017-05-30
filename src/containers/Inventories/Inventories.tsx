import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel, Button } from 'react-bootstrap';

import { SearchInput } from '..';
import { CustomTable } from '../../components';
import { filteredInventories } from '../../selectors';
import { LinkContainer } from "react-router-bootstrap";

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

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(key: string) {
    this.props.history.push(`/inventories/${key}`);
  }

  public render(): JSX.Element {
    let InventoryTable = CustomTable as new () => CustomTable<Inventory>;
    return (
      <Jumbotron>
        <div className="Inventories">
          <Panel>
            <h1>Inventario</h1>
          </Panel>
          <Panel className="utility-toolbar">
            <LinkContainer to="/orders/new">
              <Button>Nuevo inventario</Button>
            </LinkContainer>
            <SearchInput />
          </Panel>
          <InventoryTable
            fields={this.state.fields}
            items={this.props.inventories}
            itemClick={this.handleClick}
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
