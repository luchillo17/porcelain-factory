import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
} from 'redux';

import { App, Products } from './components';
import { reducers } from './reducers';

import registerServiceWorker from './registerServiceWorker';
import './style/style.css';

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/*<Route path="/" component={} />
        <Route path="/" component={} />
        <Route path="/" component={} />
        <Route path="/" component={} />
        <Route path="/" component={} />*/}
        <Route path="/products" component={Products} />
        <Route path="/" exact={true} component={App} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
