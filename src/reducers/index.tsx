import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { ProductsReducer } from './ReducerProducts';
import { InventoriesReducer } from './ReducerInventories';

import {
  OrdersReducer,
  OrderItemsReducer,
} from './ReducerOrders';

import { SearchTermReducer } from './ReducerSearchTerm';

const rootReducer = combineReducers<RXState>({
  form: formReducer,

  products: ProductsReducer,
  inventories: InventoriesReducer,

  orders: OrdersReducer,
  orderItems: OrderItemsReducer,

  searchTerm: SearchTermReducer,
});

export const reducers = rootReducer;
