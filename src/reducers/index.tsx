import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { SearchTermReducer } from './ReducerSearchTerm';
import { ProductsReducer } from './ReducerProducts';
import { InventoriesReducer } from './ReducerInventories';

const rootReducer = combineReducers<RXState>({
  form: formReducer,
  products: ProductsReducer,
  inventories: InventoriesReducer,

  searchTerm: SearchTermReducer,
});

export const reducers = rootReducer;
