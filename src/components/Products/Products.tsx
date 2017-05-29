import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

class ProductsPage extends React.Component<RouteComponentProps<any>, any> {
  public render(): JSX.Element {
    return (
      <div className="Products">
        Products
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   // Map state to props
// });

// const mapDispatchToProps = {

// };

export const Products: React.ComponentClass<any> = connect()(ProductsPage);
