import { Action } from 'redux';
import { FormComponentProps, FormSubmitHandler } from 'redux-form';

declare module 'redux' {
  interface Action {
    payload?: any;
  }

  type MyReducer<S> = (state: S, action: Action) => S;
}

declare module 'redux-form' {
  interface FormComponentProps {
    handleSubmit: FormSubmitHandler;
  }
}
