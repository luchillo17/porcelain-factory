import * as React from 'react';
import { Table, Panel } from 'react-bootstrap';

import { map, at } from 'lodash';

interface TableProps<T> {
  fields: TableField[];
  items: {
    [key: string]: T,
  };
  itemClick?: (key: string) => void;
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
      (item) => {
        let key = (item as any).id;
        return (
          <tr onClick={() => this.handleItemClick(key)} key={key}>
            {this.renderItem(item)}
          </tr>
        );
      }
    );
  }

  public handleItemClick(key: string) {
    if (!this.props.itemClick) {
      return;
    }
    this.props.itemClick(key);
  }

  public renderItem(item: T) {
    return map(this.props.fields, (field) => (
      <td key={field.key}>{at(item as any, field.key)}</td>
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
