import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Jumbotron, Panel } from 'react-bootstrap';

interface ProductProps extends RouteComponentProps<any> {
  product: Product;
}

class ProductPage extends React.Component<ProductProps, any> {

  constructor(props: ProductProps) {
    super(props);

    this.state = {
      isNew: !this.props.match.params.id
    };
  }

  public render(): JSX.Element {

    return (
      <Jumbotron>
        <div className="Product">
          <Panel>
            <h1>{this.state.isNew ? 'Nuevo ' : ''}Producto</h1>
          </Panel>

        </div>
      </Jumbotron>
    );
  }
}

const mapStateToProps: MapStateToProps<{product: Product}, RouteComponentProps<any>> =
  ({ products }: {products: Products}, ownProps) => {
    let productId = ownProps && ownProps.match.params.id;
    let product = productId ? products[productId] : {} as Product;
    return {
      product,
    };
  };

const mapDispatchToProps = {};

export const Product: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(ProductPage);
