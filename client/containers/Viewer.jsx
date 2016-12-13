import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Songs from './Songs';
import Table from './../components/Table'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  trackList: PropTypes.array.isRequired,
  totalSongs: PropTypes.number.isRequired,
  songs: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired
};

class Viewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageStart: 0,
      pageEnd: 10,
      pageInterval: 10
    }
  }

  currentPagination() {
    return this.props.trackList.slice(this.state.pageStart, this.state.pageEnd)
  }

  nextPage() {
    this.setState((prevState) => {
      const pageStart = prevState.pageEnd
      const pageEnd = pageStart + this.state.pageInterval

      if (pageEnd <= this.props.totalSongs) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }
    })
  }

  prevPage() {
    this.setState((prevState) => {
      const pageEnd = prevState.pageStart
      const pageStart = prevState.pageStart - this.state.pageInterval

      if (pageStart >= 0) {
        return {
          pageStart: pageStart,
          pageEnd: pageEnd,
        }
      }

    })
  }

  generateSongsFromTrackList() {
    const songs = this.currentPagination().map((songKey, i) => {
      console.log(songKey)
      const song = this.props.songs[songKey]
      const album = this.props.albums[song.albumId]
      const artist = this.props.artists[song.artistsId[0]]

      return {
        song: song,
        album: album,
        artist: artist
      }
    })
    return songs || [{}];
  }

  render() {
    return (
      <div>
        <Table data={this.generateSongsFromTrackList()} />
        <button disabled={this.state.pageStart === 0} onClick={this.prevPage.bind(this)}>prev</button>
        <button disabled={this.state.pageEnd >= this.props.totalSongs} onClick={this.nextPage.bind(this)}>next</button>
      </div>
    )
  }
}

Viewer.propTypes = propTypes;

function mapStateToProps(state) {
  return Object.assign({}, state.musicData, {
    trackList: state.user.trackList,
  })
}

export default connect(mapStateToProps)(Viewer);
