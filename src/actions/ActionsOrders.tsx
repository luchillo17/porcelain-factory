import { ActionCreator } from 'redux';
import { Action } from 'redux';

export const SET_ORDER = 'SET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const SET_ORDER_ITEM = 'SET_ORDER_ITEM';
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';

export const setOrder: ActionCreator<Action> =
  (payload: Order) => ({
    type: SET_ORDER,
    payload,
  });

export const deleteOrder: ActionCreator<Action> =
  (payload: string) => ({
    type: DELETE_ORDER,
    payload,
  });

export const setOrderItem: ActionCreator<Action> =
  (payload: Order) => ({
    type: SET_ORDER_ITEM,
    payload,
  });

export const deleteOrderItem: ActionCreator<Action> =
  (payload: string) => ({
    type: DELETE_ORDER_ITEM,
    payload,
  });
