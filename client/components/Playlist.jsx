import React, { Component, PropTypes } from 'react'

const propTypes = {
  generatePlaylist: PropTypes.func.isRequired,
  finishPlaylist: PropTypes.func.isRequired,
  creatingPlaylist: PropTypes.bool.isRequired,
  playlistName: PropTypes.string,
  playlistId: PropTypes.string,
  playlistUrl: PropTypes.string,
  callingApi: PropTypes.bool.isRequired
}

class Playlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'Made By Playlistify'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { value } = this.state
    const {
      creatingPlaylist,
      generatePlaylist,
      callingApi,
      playlistName,
      playlistUrl,
      finishPlaylist
    } = this.props

    return (
      <div>
        {creatingPlaylist &&
          <div>
            <div className='Overlay' />

            <div className='Modal'>

              {!playlistUrl && !callingApi &&
                [
                  <input value={this.state.value} onChange={this.handleChange} type='text' />,
                  <button onClick={() => { generatePlaylist(value) }}>
                    Generate!
                  </button>
                ]
              }

              {callingApi &&
                <div>Generating {playlistName}</div>
              }

              {!callingApi && playlistUrl &&
                [
                  <a href={playlistUrl}>{playlistName}</a>,
                  <button onClick={finishPlaylist} >Make Another!</button>
                ]
              }

            </div>

          </div>
        }
      </div>
    )
  }
}

Playlist.propTypes = propTypes

export default Playlist
