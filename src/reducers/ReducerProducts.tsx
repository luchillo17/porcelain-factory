import { MyReducer } from 'redux';
import { omit } from 'lodash';

import { SET_PRODUCT, DELETE_PRODUCT } from '../actions';

export const ProductsReducer: MyReducer<Products> =
  (state, action) => {
    switch (action.type) {
      case SET_PRODUCT:
        const product = action.payload;
        return { ...state, [product.id]: product };

      case DELETE_PRODUCT:
        return omit<Products, Products>(state, action.payload);

      default:
        return state;
    }
  };
