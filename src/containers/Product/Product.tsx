import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';
import { Action } from 'redux';
import { Field, reduxForm, FormComponentProps } from 'redux-form';
import {
  Jumbotron,
  Panel,
  // Button
} from 'react-bootstrap';

import {v1 as uuid} from 'uuid';

import { FormInput } from '../../components/index';
import { setProduct } from '../../actions';

import './Product.css';
import { Validators } from '../../utils/index';

interface ProductProps extends FormComponentProps, RouteComponentProps<any> {
  product: Product;
  setProduct: (product: Product) => Action;
}

class ProductPage extends React.Component<ProductProps, any> {

  constructor(props: ProductProps) {
    super(props);

    this.state = {
      isNew: !this.props.match.params.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(values: Product) {
    const product = this.props.product;
    const price = parseFloat(values.price as any);

    Object.assign(product, values, { price });
    this.props.setProduct(product);
  }

  public render(): JSX.Element {
    const handleSubmit = (this.props as any).handleSubmit;
    return (
      <Jumbotron>
        <div className="Product">
          <Panel>
            <h1>{this.state.isNew ? 'Nuevo ' : ''}Producto</h1>
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
                name="name"
                type="text"
                label="Nombre"
                component={FormInput}
                validate={[Validators.required, Validators.minLength3]}
              />
              <Field
                name="type"
                type="text"
                label="Tipo"
                component={FormInput}
                validate={[Validators.required, Validators.minLength3]}
              />
              <Field
                name="price"
                type="number"
                label="Precio"
                component={FormInput}
                validate={[
                  Validators.required,
                  Validators.number,
                  Validators.minValueInclusive(0),
                ]}
              />
              <Field
                name="considerations"
                label="Consideraciones"
                componentClass="textarea"
                component={FormInput}
              />
              <button type="submit">Guardar</button>
            </form>
          </Panel>
        </div>
      </Jumbotron>
    );
  }
}

const ProductFormWrapper = reduxForm({
  form: 'product',
})(ProductPage);

const mapStateToProps: MapStateToProps<{product: Product}, RouteComponentProps<any>> =
  ({ products }: {products: Products}, ownProps) => {
    let productId = ownProps && ownProps.match.params.id;
    let product = productId ? products[productId] : { id: uuid() } as Product;
    return {
      product,
      initialValues: {
        ...product,
      },
    };
  };

const mapDispatchToProps = {
  setProduct,
};

export const Product: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(ProductFormWrapper);
