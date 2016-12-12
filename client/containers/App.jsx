import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initAuth } from './../actions/AuthActions'

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initAuth())
    console.log(this.props)
  }

  render() {
    const { auth } = this.props
    const { accessToken } = auth
    return (
      <div> {accessToken}</div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
