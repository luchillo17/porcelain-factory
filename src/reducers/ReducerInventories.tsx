import { MyReducer } from 'redux';
import { omit } from 'lodash';

import { SET_INVENTORY, DELETE_INVENTORY } from '../actions';

const inventoriesInitialState: Inventories = {
  0: {
    id: '0',
    productId: '1',
    quantity: 150,
    reserved: 0,
  },
  1: {
    id: '1',
    productId: '0',
    quantity: 120,
    reserved: 0,
  },
};

export const InventoriesReducer: MyReducer<Inventories> =
  (state = inventoriesInitialState, action) => {
    switch (action.type) {
      case SET_INVENTORY:
        const inventory = action.payload;
        return { ...state, [inventory.id]: inventory };

      case DELETE_INVENTORY:
        return omit<Inventories, Inventories>(state, action.payload);

      default:
        return state;
    }
  };
