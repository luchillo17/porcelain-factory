import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { SearchTermReducer } from './ReducerSearchTerm';
import { ProductsReducer } from './ReducerProducts';

const rootReducer = combineReducers<RXState>({
  form: formReducer,
  products: ProductsReducer,
  searchTerm: SearchTermReducer,
});

export const reducers = rootReducer;
