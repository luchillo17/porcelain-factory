import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { ProductsReducer } from './ReducerProducts';

const rootReducer = combineReducers({
  form: formReducer,
  products: ProductsReducer,
});

export const reducers = rootReducer;
