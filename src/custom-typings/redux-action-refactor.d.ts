import { Action } from 'redux';

declare module 'redux' {
  interface Action {
    payload?: any;
  }

  type MyReducer<S> = (state: S, action: Action) => S;
}
