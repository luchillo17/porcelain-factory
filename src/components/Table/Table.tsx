import * as React from 'react';
import { Table } from 'react-bootstrap';

interface TableProps {
  fields: Field[];
}

interface TableState {}

export class CustomTable extends React.Component<TableProps, TableState> {

  public renderHeaders() {
    return this.props.fields.map((field) =>
      <td key={field.key}>{field.label}</td>
    );
  }

  public render(): JSX.Element {
    return (
      <div className="Table">
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
          <tbody />
        </Table>
      </div>
    );
  }
}
