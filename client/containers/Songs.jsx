// TODO: Implement pagination

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import Song from './../components/Song'

const propTypes = {
  songKeys: PropTypes.array.isRequired,
  albums: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired
};

const Songs = (props) => {
  const songs = props.songKeys.map((songKey, i) => {
    const song = props.songs[songKey]
    const album = props.albums[song.albumId]
    const artist = props.artists[song.artistsId[0]]
    return <Song key={i} song={song} album={album} artist={artist} />
  })

  return <div> {songs} </div>
}

Songs.propTypes = propTypes;

function mapStateToProps(state) {
  return Object.assign({}, state.musicData)
}

export default connect(mapStateToProps)(Songs);
