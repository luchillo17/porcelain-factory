import { ActionCreator } from 'redux';
import { Action } from 'redux';

export const SET_INVENTORY = 'SET_INVENTORY';
export const DELETE_INVENTORY = 'DELETE_INVENTORY';

export const setInventory: ActionCreator<Action> =
  (payload: Product) => ({
    type: SET_INVENTORY,
    payload,
  });

export const deleteInventory: ActionCreator<Action> =
  (payload: string) => ({
    type: DELETE_INVENTORY,
    payload,
  });
