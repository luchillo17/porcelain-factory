import { ActionCreator } from 'redux';
import { Action } from 'redux';

export const SET_ORDER = 'SET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const setOrder: ActionCreator<Action> =
  (payload: Product) => ({
    type: SET_ORDER,
    payload,
  });

export const deleteOrder: ActionCreator<Action> =
  (payload: string) => ({
    type: DELETE_ORDER,
    payload,
  });
