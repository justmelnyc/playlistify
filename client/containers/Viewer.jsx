import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Table from './../components/Table'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  trackList: PropTypes.array.isRequired,
  tracks: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired
};

class Viewer extends React.Component {
  constructor(props) {
    super(props)
  }

  generateFilteredTracks() {
    const { filteredTrackList , tracks, albums, artists } = this.props
    
    const filteredTracks = filteredTrackList.map((trackId, i) => {
      const track = tracks[trackId]
      const album = albums[track.album]
      const artist = artists[track.artists[0]]

      return {
        track: track,
        album: album,
        artist: artist
      }
    })

    return filteredTracks || [{}];
  }

  render() {
    const { filteredTrackList } = this.props
    
    return (
      <div className="Pane Pane--8 Viewer">
        <div className="Pane-topBar">
          <h2>{filteredTrackList.length} Songs</h2>
        </div>
        <div className="Pane-content">
          <Table data={this.generateFilteredTracks()} />
        </div>
      </div>
    )
  }
}

Viewer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    ...state.entities,
    filteredTrackList: state.filter.filteredTrackList
  }
}

export default connect(mapStateToProps)(Viewer);
