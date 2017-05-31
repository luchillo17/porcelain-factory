import { MyReducer } from 'redux';
import { omit } from 'lodash';

import { SET_PRODUCT, DELETE_PRODUCT } from '../actions';

const defaultProductState: Product = {
  id: '0',
  name: '',
  type: '',
  price: 0,
  considerations: '',
};

const productsInitialState: Products = {
  0: {
    id: '0',
    name: 'Baldosa',
    type: 'Piso',
    price: 60000,
    considerations: '',
  },
  1: {
    id: '1',
    name: 'Cemento',
    type: 'Material',
    price: 25000,
    considerations: '',
  },
};

export const ProductsReducer: MyReducer<Products> =
  (state = productsInitialState, action) => {
    switch (action.type) {
      case SET_PRODUCT:
        const product = Object.assign({}, defaultProductState, action.payload) as Product;
        return { ...state, [product.id]: product };

      case DELETE_PRODUCT:
        return omit<Products, Products>(state, action.payload);

      default:
        return state;
    }
  };
