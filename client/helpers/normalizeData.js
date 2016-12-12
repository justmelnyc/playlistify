/**
 * 
 * @Param {items} Array of track objects from Spotify API
 * 
 * returns normalized object containing
 *   songs
 *   albums
 *   artists
 * 
 * 
 */

export function normalizeSpotifyMusicData(items) {
  const songData = {}
  const albumData = {}
  const artistData = {}

  items.forEach((song) => {
    const track = song.track;
    songData[track.id] = normalizeTrackData(song)
    albumData[track.album.id] = normalizeAlbumData(song)
    Object.assign(artistData, normalizeArtistData(song))
  })

  return {
    songs: songData,
    albums: albumData,
    artists: artistData
  }
}

// Private functions

function normalizeTrackData(song) {
  const track = song.track;
  const artists = song.track.artists
  const album = song.track.album

  return {
    addedAt: song.added_at,
    albumId: album.id,
    artistsId: artists.map((artist) => {
      return artist.id
    }),
    discNumber: track.disc_number,
    duractionMs: track.duration_ms,
    explicit: track.explicit,
    href: track.href,
    name: track.name,
    popularity: track.popularity,
    previewUrl: track.preview_url,
    trackNumber: track.track_number,
    type: track.type,
    uri: track.uri
  }
}

function normalizeAlbumData(song) {
  const album = song.track.album

  return {
    albumType: album.album_type,
    artistIds: album.artists.map((artist) => {
      return artist.id
    }),
    images: album.images,
    name: album.name,
    type: album.type,
    uri: album.uri
  }
}

function normalizeArtistData(song) {
  const artists = song.track.artists
  const artistData = {}
  artists.forEach((artist) => {
    artistData[artist.id] = {
      href: artist.href,
      name: artist.name,
      type: artist.type,
      uri: artist.uri
    }
  })

  return artistData;
}