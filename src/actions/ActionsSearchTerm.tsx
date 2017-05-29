import { ActionCreator } from 'redux';
import { Action } from 'redux';

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';

export const searchByTerm: ActionCreator<Action> =
  (payload: string) => ({
    type: SEARCH_PRODUCT,
    payload,
  });
