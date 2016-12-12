import React, { PropTypes } from 'react'

import Song from './Song'

const propTypes = {
  musicData: PropTypes.shape({
    albums: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
    artists: PropTypes.object.isRequired
  })
};

const Songs = (props) => {
  props = props.musicData

  const songs = []

  Object.keys(props.songs).forEach( (songKey) => {
    const song = props.songs[songKey]
    const album = props.albums[song.albumId]
    const artist = props.artists[song.artistsId[0]]
    songs.push(<Song key={song.id} song={song} album={album} artist={artist} />)
  })

  return <div> {songs} </div>
}

Songs.propTypes = propTypes;

export default Songs
