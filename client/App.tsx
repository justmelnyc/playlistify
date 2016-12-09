import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Login } from './auth';
import { Home } from './main';

interface Props { }
interface State { }

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/auth" component={Login} />
        <Route path="/" component={Home} />
      </Router>
    )
  }
}
