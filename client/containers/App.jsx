const DATA = [
  {
    "row1": "1Lorem ipsum  sit amet",
    "row2": "1Lorem dolor sit amet",
    "row3": "1Lorem ipsum dolor  amet"
  },
  {
    "row1": "2Lor ipsum dolor sit amet",
    "row2": "2Lorem ipsum dolor sit amet",
    "row3": "2Lorm ipsum dolor sit aet"
  },
  {
    "row1": "3Lom ipsum dolor sit amet",
    "row2": "3Lorem sum dolor sit amet",
    "row3": "3Lorem ipsum dor sit amet"
  }
]

const SORT_ASC = {
          key: Object.keys(DATA[0])[0],
          direction: 'desc'
        }

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Viewer from './Viewer';
import Sorter from './Sorter';
import { login } from './../actions/login'
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
    dispatch(login())
  }

  headerClickHandler() {
    console.log('header')
  }

  render() {
    const { musicData, songs, user } = this.props
    const { profile } = user

    console.log(user)

    console.log(musicData)
    return (
      <div className="Container" >
        <Table data={DATA} sort={SORT_ASC} onHeaderClick={this.headerClickHandler.bind(this)}/>

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
    user: state.user,
    musicData: state.musicData
  }
}

export default connect(mapStateToProps)(App);
