import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Table from './../components/Table'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  trackList: PropTypes.array.isRequired
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
    const tracks = this.currentPagination().map((trackId, i) => {
      const track = this.props.tracks[trackId]
      const album = this.props.albums[track.album]
      const artist = this.props.artists[track.artists[0]]

      return {
        track: track,
        album: album,
        artist: artist
      }
    })

    return tracks || [{}];
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
  return {
    ...state.entities, 
    filter: state.filter  
  }
}

export default connect(mapStateToProps)(Viewer);
