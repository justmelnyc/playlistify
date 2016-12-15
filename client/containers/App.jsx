import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Viewer from './Viewer';
import { login } from './../actions/login'


const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(login())
  }

  render() {
    return (
      <div className="Container" >
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
