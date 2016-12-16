import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Viewer from './Viewer'
import Filters from './Filters'

import * as AuthedActions from './../actions/AuthedUser'
import { createPlaylist } from './../actions/CreatePlaylist'

const propTypes = {
  dispatch: PropTypes.func.isRequired
}

class App extends Component {
  constructor (props) {
    super(props)
    this.createPlaylist = this.createPlaylist.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(AuthedActions.initialLogin())
  }

  createPlaylist () {
    this.props.dispatch(createPlaylist('MAKE A DEFAULT NAME'))
  }

  render () {
    return (
      <div className='Container'>
        <div className='Nav'>
          <button onClick={this.createPlaylist}>Create Playlist</button>
        </div>
        <Filters />
        <Viewer />
      </div>
    )
  }
}

App.propTypes = propTypes

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(App)
