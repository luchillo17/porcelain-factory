import { Action } from 'redux';

export const SET_PRODUCT = 'SET_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProduct =
  (payload: Product): Action => ({
    type: SET_PRODUCT,
    payload,
  });

export const deleteProduct =
  (payload: string): Action => ({
    type: DELETE_PRODUCT,
    payload,
  });
