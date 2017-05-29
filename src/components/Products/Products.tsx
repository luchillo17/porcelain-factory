import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { CustomTable } from '..';

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
  }
  public render(): JSX.Element {
    let ProductTable = CustomTable as new () => CustomTable<Product>;
    return (
      <div className="Products">
        Products
        <ProductTable
          fields={this.state.fields}
          items={this.props.products}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products,
});

const mapDispatchToProps = {

};

export const Products: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
