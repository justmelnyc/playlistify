import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Login } from './auth';
import { Home } from './main';
require('./../sass/index.scss');


export class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/auth" component={Login} />
        <Route path="/" component={Home} />
      </Router>
    )
  }
}
