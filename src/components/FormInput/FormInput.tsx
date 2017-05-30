import * as React from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import {
  WrappedFieldProps,
} from 'redux-form';

interface FormInputProps extends WrappedFieldProps<any> {
  type: string;
  label: string;
  readOnly: boolean;
  placeholder: string;
}

interface FormInputState {}

export class FormInput extends React.Component<FormInputProps, FormInputState> {
  public render(): JSX.Element {

    const {
      type,
      label,
      input,
      readOnly,
      placeholder = 'Enter text',
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const validationState = touched &&
      ( error && 'error' ) ||
      ( warning && 'warning' ) ||
      undefined;

    let {
    } = this.props;
    return (
      <FormGroup
        controlId={name}
        validationState={validationState}
      >
        <InputGroup>
          <InputGroup.Addon>{label}: </InputGroup.Addon>
          <FormControl
            type={type}
            readOnly={readOnly}
            placeholder={placeholder}
            {...input}
            {...props}
          />
        </InputGroup>
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}
