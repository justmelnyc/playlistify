import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Viewer from './Viewer'
import Filters from './Filters'

import * as AuthActions from './../actions/AuthActions'
import { createPlaylist } from './../actions/PlaylistActions'

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
    this.createPlaylist = this.createPlaylist.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(AuthActions.initialLogin())
  }

  createPlaylist () {
    this.props.dispatch(createPlaylist('MAKE A DEFAULT NAME'))
  }

  render () {
    const { isLoggedIn, profile, trackList, playlist } = this.props
    const { creatingPlaylist, playlistName } = playlist

    console.log(trackList)

    return (
      <div className='Container'>
        <div className='Nav'>
          <button onClick={this.createPlaylist}>Create Playlist</button>
        </div>
        <Filters />
        <Viewer />

        {isLoggedIn && profile === null &&
          <div className='Loader'>
            LOADING PROFILE
          <svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
            <circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30' />
          </svg>
          </div>

        }

        {isLoggedIn && profile && !trackList.length &&
          <div className='Loader'>

          LOADING TRACKS can take a while
           <svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
             <circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30' />
           </svg></div>
        }

        {creatingPlaylist &&
          <div className='Loader'>Generating the playlist {playlistName} for you
           <svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
             <circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30' />
           </svg></div>
        }

      </div>
    )
  }
}

App.propTypes = propTypes

function mapStateToProps (state) {
  console.log(state)
  return {
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    trackList: state.entities.trackList,
    playlist: state.playlist
  }
}

export default connect(mapStateToProps)(App)
