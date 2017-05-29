import * as React from 'react';
import {
  Component,
  FormEvent,
} from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { debounce } from 'lodash';

interface SearchBarProps {
  handleSearch: (term: string) => void;
}

interface SearchBarState {}

type FormControlEvent = FormEvent<Component<FormGroup, {}>>;

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    // this.search = debounce(this.search.bind(this), 300);
    this.search = debounce(this.search, 300);
    this.onChange = this.onChange.bind(this);

  }

  public search(event: FormControlEvent) {
    // console.log('Event: ', event);
    let target = event.target as HTMLInputElement;
    this.props.handleSearch(target.value);
  }

  public onChange(event: FormControlEvent) {
    event.persist();
    this.search(event);
  }

  public render(): JSX.Element {
    return (
      <Form inline={true}>
        <FormGroup
          controlId="formBasicText"
        >
          <InputGroup>
            <InputGroup.Addon>Buscar: </InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Enter text"
              onChange={this.onChange}
            />
          </InputGroup>
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    );
  }
}
