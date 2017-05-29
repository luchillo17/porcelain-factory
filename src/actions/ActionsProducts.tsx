import { ActionCreator } from 'redux';
import { Action } from 'redux';

export const SET_PRODUCT = 'SET_PRODUCT';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProduct: ActionCreator<Action> =
  (payload: Product) => ({
    type: SET_PRODUCT,
    payload,
  });

export const searchProduct: ActionCreator<Action> =
  (payload: string) => ({
    type: SEARCH_PRODUCT,
    payload,
  });

export const deleteProduct: ActionCreator<Action> =
  (payload: string) => ({
    type: DELETE_PRODUCT,
    payload,
  });
