import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Viewer from './Viewer';
import Sorter from './Sorter';
import { login } from './../actions/login'
import ProfileBar from './../components/ProfileBar';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  musicData: PropTypes.object.isRequired
};

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(login())
  }

  render() {
    const { musicData, songs, profile } = this.props
    console.log(musicData)
    return (
      <div className="Container" >
        <ProfileBar profile={profile} />
        <Sorter />
        <Viewer />
      </div>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    profile: state.profile,
    musicData: state.musicData
  }
}

export default connect(mapStateToProps)(App);
