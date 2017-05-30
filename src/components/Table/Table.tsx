import * as React from 'react';
import { Table, Panel } from 'react-bootstrap';

import { map } from 'lodash';

interface TableProps<T> {
  fields: Field[];
  items: {
    [key: string]: T,
  };
}

interface TableState {}

export class CustomTable<T> extends React.Component<TableProps<T>, TableState> {

  public renderHeaders() {
    return map(this.props.fields, (field) =>
      <td key={field.key}>{field.label}</td>
    );
  }

  public renderItems() {
    return map(
      this.props.items,
      (item) => (
        <tr key={(item as any).id}>
          {this.renderItem(item)}
        </tr>
      )
    );
  }

  public renderItem(item: T) {
    return map(this.props.fields, (field) => (
      <td key={field.key}>{item[field.key]}</td>
    ));
  }

  public render(): JSX.Element {
    return (
      <Panel className="Table">
        <Table
          responsive={true}
          condensed={true}
          bordered={true}
          striped={true}
          hover={true}
        >
          <thead>
            <tr>
              {this.renderHeaders()}
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </Table>
      </Panel>
    );
  }
}
