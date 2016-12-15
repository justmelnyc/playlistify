import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Viewer from './Viewer';
import Filter from './Filter';

import * as AuthedActions from './../actions/AuthedUser'


const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(AuthedActions.initialLogin())
  }

  render() {
    return (
      <div className="Container" >
        <Filter />
        <Viewer />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App);
