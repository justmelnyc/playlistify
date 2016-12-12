import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initAuth } from './../actions/AuthActions'

import { Songs } from './../components/Songs';


const propTypes = {
  dispatch: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initAuth())
  }

  render() {
    const { auth, songs } = this.props

    return (
      <div>
        <Songs songs={songs} />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    auth: state.auth,
    tracks: state.tracks
  }
}

export default connect(mapStateToProps)(App);
