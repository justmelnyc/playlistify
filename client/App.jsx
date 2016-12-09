import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Login } from './components/auth';
import { Home } from './components/main';

// require('bootstrap/scss/bootstrap.scss');
require('./../sass/index.scss');

export class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router history={browserHistory}>
          <Route path="/auth" component={Login} />
          <Route path="/" component={Home} />
        </Router>
      </div>
    )
  }
}
