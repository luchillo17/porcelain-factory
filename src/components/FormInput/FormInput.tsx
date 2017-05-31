import * as React from 'react';
import { FormGroup, InputGroup, FormControl, HelpBlock } from 'react-bootstrap';
import {
  WrappedFieldProps,
} from 'redux-form';

interface FormInputProps extends WrappedFieldProps<any> {
  type: string;
  label: string;
  readOnly: boolean;
  placeholder: string;
  componentClass: string;
}

interface FormInputState {}

export class FormInput extends React.Component<FormInputProps, FormInputState> {
  public render(): JSX.Element {

    const {
      type,
      label,
      input,
      readOnly,
      componentClass,
      placeholder = 'Enter text',
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const validationState = touched &&
      ( error && 'error' ) ||
      ( warning && 'warning' ) ||
      undefined;

    return (
      <FormGroup
        controlId={name}
        validationState={validationState}
      >
        <InputGroup>
          <InputGroup.Addon>{label}: </InputGroup.Addon>
          <FormControl
            type={type}
            componentClass={componentClass}
            readOnly={readOnly}
            placeholder={placeholder}
            {...input}
            {...props}
          />
        </InputGroup>
        <FormControl.Feedback />
        {
          validationState &&
          <HelpBlock>{error || warning}</HelpBlock>
        }
      </FormGroup>
    );
  }
}
