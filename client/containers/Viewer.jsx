import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Table from './../components/Table'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  trackList: PropTypes.array.isRequired,
  tracks: PropTypes.object.isRequired
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

  generateFilteredTracks() {
    const tracks = this.getFilteredListOfIds().map((trackId, i) => {
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

  getFilteredListOfIds() {
    const { trackList } = this.props
    return trackList.filter((id) => { return this.filterTracks(id) })
  }

  filterTracks(trackId) {
    const { trackList, filter, tracks } = this.props
    const track = tracks[trackId]
    return this.isTrackInFilteredRange(track)
  }

  isTrackInFilteredRange(track) {
    const { filter } = this.props
    let keepTrack = true

    Object.keys(filter).forEach((filterKey) => {
      const currFilter = filter[filterKey]
      const min = currFilter.min
      const max = currFilter.max
      const isActive = currFilter.active
      const trackValue = track[filterKey]
      if (isActive && trackValue < min || trackValue > max) { keepTrack = false }
    })

    return keepTrack
  }

  render() {
    return (
      <div>
        <Table data={this.generateFilteredTracks()} />
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
