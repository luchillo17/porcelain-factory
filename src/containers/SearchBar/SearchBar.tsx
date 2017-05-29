import * as React from 'react';
import {
  Component,
  FormEvent,
} from 'react';
import { Action } from 'redux';
import { connect, ActionCreator } from 'react-redux';
import {
  Form,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { debounce } from 'lodash';


import { searchByTerm } from '../../actions';

interface SearchBarProps {
  searchByTerm: ActionCreator<Action>;
}

interface SearchBarState {

}

type FormControlEvent = FormEvent<Component<FormGroup, {}>>;

export class SearchBarComponent extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.props.searchByTerm('');

    this.search = debounce(this.search.bind(this), 300);
    this.onChange = this.onChange.bind(this);
  }

  public search(event: FormControlEvent) {
    let target = event.target as HTMLInputElement;
    this.props.searchByTerm(target.value);
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

const mapStateToProps = ({ searchTerm }) => ({

});

const mapDispatchToProps = {
  searchByTerm,
};

export const SearchBar: React.ComponentClass<any> =
  connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
