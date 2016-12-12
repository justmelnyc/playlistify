import React, { PropTypes } from 'react'

const propTypes = {
  album: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired
};

class Song extends React.Component {

  render() {
    return (
      <div className="Song">
        <div className="Song-song">{this.props.song.name}</div>
        <div className="Song-artist">{this.props.artist.name}</div>
        <div className="Song-album">{this.props.album.name}</div>
      </div>
    )
  }
}

Song.propTypes = propTypes;

export default Song
