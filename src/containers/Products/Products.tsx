import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel, Button } from 'react-bootstrap';

import { SearchInput } from '..';
import { CustomTable } from '../../components';
import { filteredProducts } from '../../selectors';
import { LinkContainer } from 'react-router-bootstrap';

interface ProductProps extends RouteComponentProps<any> {
  products: Products;
}

class ProductsPage extends React.Component<ProductProps, any> {

  constructor(props: ProductProps) {
    super(props);

    this.state = ({
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'name',
          label: 'Nombre',
        },
        {
          key: 'type',
          label: 'Tipo',
        },
        {
          key: 'price',
          label: 'Precio',
        },
      ]  as Field[],
    });

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(key: string) {
    this.props.history.push(`/products/${key}`);
  }

  public render(): JSX.Element {
    let ProductTable = CustomTable as new () => CustomTable<Product>;
    return (
      <Jumbotron>
        <div className="Products">
          <Panel>
            <h1>Productos</h1>
          </Panel>
          <Panel className="utility-toolbar">
            <LinkContainer to="/products/new">
              <Button>Nuevo producto</Button>
            </LinkContainer>
            <SearchInput />
          </Panel>
          <ProductTable
            fields={this.state.fields}
            items={this.props.products}
            itemClick={this.handleClick}
          />
        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  products: filteredProducts(state),
});

const mapDispatchToProps = {};

export const Products: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
