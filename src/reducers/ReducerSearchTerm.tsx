import { MyReducer } from 'redux';

import {
  SEARCH_PRODUCT,
} from '../actions';

export const SearchTermReducer: MyReducer<string> =
  (state = '', action) => {
    switch (action.type) {
      case SEARCH_PRODUCT:
        return action.payload;

      default:
        return state;
    }
  };
