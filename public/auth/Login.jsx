import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Login extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="font-weight-bold">Login to Get Started</h1>
        <a href="/login" type="button" className="btn btn-primary">Login</a>
      </div>
    )
  }
}
