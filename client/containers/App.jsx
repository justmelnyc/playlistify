import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Viewer from './Viewer';
import Sorter from './Sorter';

import * as AuthedActions from './../actions/AuthedUser'

import ProfileBar from './../components/ProfileBar';

import Table from './../components/Table';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  musicData: PropTypes.object.isRequired
};

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(AuthedActions.initialLogin())
  }

  headerClickHandler() {
    console.log('state')
  }

  render() {
    const { musicData, songs, user } = this.props
    const { profile } = user


    return (
      <div className="Container" >

      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(App);

        // <ProfileBar profile={profile} />
        // <Viewer />