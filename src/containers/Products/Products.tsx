import * as React from 'react';
import { Action } from 'redux';
import { connect, ActionCreator } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { CustomTable, SearchBar } from '../../components';
import { searchProduct } from '../../actions';
import { filteredProducts } from '../../selectors';

interface ProductProps extends RouteComponentProps<any> {
  products: Products;
  searchProduct: ActionCreator<Action>;
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

    this.handleSearch = this.handleSearch.bind(this);
  }

  public handleSearch(term: string) {
    this.props.searchProduct(term);
  }

  public render(): JSX.Element {
    let ProductTable = CustomTable as new () => CustomTable<Product>;
    return (
      <div className="Products">
        Products
        <SearchBar
          handleSearch={this.handleSearch}
        />
        <ProductTable
          fields={this.state.fields}
          items={this.props.products}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: filteredProducts(state),
});

const mapDispatchToProps = {
  searchProduct,
};

export const Products: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
