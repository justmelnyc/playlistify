import * as types from './../constants/ActionTypes'

// TODO: REFACTOR THIS

/**
 * 
 * Login
 *  1. parse token from url 
 *  2. get users profile info 
 *  3. get all of the users saved songs 
 */

export const initAuth = () => {
  return (dispatch) => {
    const accessToken = getAccessTokenFromUrl()
    if (accessToken) {
      dispatch(receiveAccessToken(accessToken))
      return dispatch(getUserProfile(accessToken))
    } else {
      return null
    }
  }
}

function getAccessTokenFromUrl() {
  const token = window.location.hash.split('&')[0].split('=')[1]
  return token || null
}

function getUserProfile(accessToken) {
  return (dispatch) => {
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(res => res.json())
      .then((d) => {
        dispatch(receiveUserProfile(d))
        return dispatch(getUserSongs(accessToken))
      })
      .catch((e) => {
        dispatch(logOut(e))
      })
  }
}

function getUserSongs(accessToken) {
  return (dispatch) => {
    songData(accessToken).then((d) => {
      const normalized = normalizeSpotifySongData(d)
      return getAudioFeatures(accessToken, normalized)
    })
    .then((data) => {
      dispatch(receiveUserTracks(data))
    })
  }
}

function songData(accessToken, url = 'https://api.spotify.com/v1/me/tracks?limit=50', data = []) {
  if (!url) {
    return Promise.resolve(data)
  }

  // KEEP THIS JUST FOR DEV TO NOT BLOW UP SPOTIFY SERVERS
  if (data.length > 140) {
    return Promise.resolve(data)
  }

  return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(res => res.json())
    .then((res) => {
      data = data.concat(res.items)
      return songData(accessToken, res.next, data)
    })
}


function getAudioFeatures(accessToken, normalizedData) {
  const trackIds = Object.keys(normalizedData.songs)
  return trackIds
}

// LEFT OFF AT 
// GOING THROUGH AND UPDATING ALL THE SONG DATA WITH THE VELOCITY OF SONGS
// TAKE IN THE NORMALIZED OBJECT AND RETURN AND UPDATED ON
function audioFeaturesByIds(accessToken, ids, normalized) {
  if (ids.length <= 0) {
    return Promise.resolve(normalized)
  }

  // return fetch()
}



function normalizeSpotifySongData(items) {
  const songData = {}
  const albumData = {}
  const artistData = {}

  items.forEach((song) => {
    const track = song.track;
    const artists = song.track.artists
    const album = song.track.album

    songData[track.id] = {
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

    albumData[album.id] = {
      albumType: album.album_type,
      artistIds: album.artists.map((artist) => {
        return artist.id
      }),
      images: album.images,
      name: album.name,
      type: album.type,
      uri: album.uri
    }

    artists.forEach((artist) => {
      artistData[artist.id] = {
        href: artist.href,
        name: artist.name,
        type: artist.type,
        uri: artist.uri
      }
    })

  })

  return {
    songs: songData,
    albums: albumData,
    artist: artistData
  }
}

/**
 * 
 * Action Builders 
 * 
 */

function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    accessToken: accessToken
  }
}

function logOut(error = null) {
  return {
    type: types.REMOVE_ACCESS_TOKEN,
    accessToken: null,
    error: error
  }
}

function receiveUserProfile(data) {
  return {
    type: types.RECEIVE_USER_PROFILE,
    profile: data
  }
}

function receiveUserTracks(data) {
  return {
    type: types.RECEIVE_SONG_DATA,
    data
  }
}