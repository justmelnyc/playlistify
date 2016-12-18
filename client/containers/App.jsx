import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Viewer from './Viewer'
import Filters from './Filters'
import Playlist from './../components/Playlist'

import * as AuthActions from './../actions/AuthActions'
import {
  initiatePlaylist,
  createPlaylist,
  finishPlaylist
} from './../actions/PlaylistActions'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  trackList: PropTypes.array.isRequired,
  playlist: PropTypes.object.isRequired
}

class App extends Component {
  constructor (props) {
    super(props)
    this.initiatePlaylist = this.initiatePlaylist.bind(this)
    this.generatePlaylist = this.generatePlaylist.bind(this)
    this.finishPlaylist = this.finishPlaylist.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(AuthActions.initialLogin())
  }

  initiatePlaylist () {
    const { dispatch } = this.props
    dispatch(initiatePlaylist())
  }

  generatePlaylist (name) {
    const { dispatch } = this.props
    dispatch(createPlaylist(name))
  }

  finishPlaylist () {
    const { dispatch } = this.props
    dispatch(finishPlaylist())
  }

  render () {
    const { isLoggedIn, profile, trackList, playlist } = this.props

    return (
      <div className='Container'>
        <div className='Nav'>
          <button onClick={this.initiatePlaylist}>Create Playlist</button>
        </div>
        <Filters />
        <Viewer />

        {isLoggedIn && profile === null || !trackList.length &&
          <div className='Loader'>
            <svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
              <circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30' />
            </svg>
          </div>
        }

        <Playlist
          {...playlist}
          generatePlaylist={this.generatePlaylist}
          finishPlaylist={this.finishPlaylist}
          />
      </div>
    )
  }
}

App.propTypes = propTypes

function mapStateToProps (state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    trackList: state.entities.trackList,
    playlist: state.playlist
  }
}

export default connect(mapStateToProps)(App)
