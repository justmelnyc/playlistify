import * as types from './../constants/ActionTypes'

/**
 * 
 * Login
 * 
 */

export const initAuth = () => {
  return (dispatch) => {
    const accessToken = getAccessTokenFromUrl()

    if (accessToken) {
      dispatch(receiveAccessToken(accessToken))
        // we have the access token -- now lets get the user profile
      return dispatch(getAuthUser(accessToken))
    } else {
      return null
    }
  }
}

function getAccessTokenFromUrl() {
  const token = window.location.hash.split('&')[0].split('=')[1]
  return token || null
}

function getAuthUser(accessToken) {
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
      })
      .catch(() => {
        dispatch(logOut())
      })
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

function logOut() {
  return {
    type: types.REMOVE_ACCESS_TOKEN,
    accessToken: null
  }
}

function receiveUserProfile(data) {
  return {
    type: types.RECEIVE_USER_PROFILE,
    profile: data
  }
}