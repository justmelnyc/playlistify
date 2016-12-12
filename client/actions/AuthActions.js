import * as types from './../constants/ActionTypes'

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
      dispatch(receiveUserSongs(d))
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

function receiveUserSongs(data) {
  return {
    type: types.RECEIVE_SONG_DATA,
    songs: data
  }
}