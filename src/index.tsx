import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
} from 'redux';

import { App } from './components';
import {
  Order,
  Orders,
  Product,
  Products,
  Inventories,
} from './containers';
import { reducers } from './reducers';

import registerServiceWorker from './registerServiceWorker';
import './style/style.css';

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <App />
        <Switch>
          {/*<Route path="/" component={} />
          <Route path="/" component={} />*/}
          <Route path="/inventories" component={Inventories} />
          <Route path="/products/new" component={Product} />
          <Route path="/products/:id" component={Product} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/:id" component={Order} />
          <Route path="/" exact={true} component={Products} />
        </Switch>
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
