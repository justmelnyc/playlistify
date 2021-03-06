import * as ActionCreators from './ActionCreators'
import * as API from './../helpers/SpotifyApi'
import * as TrackActions from './TrackActions'
import * as ProfileActions from './ProfileActions'

/**
 *
 * Checks the exp time and if there is a token and if there
 * isnt returns the invalidateUserSesssion action creation
 *
 * returns the accessToken
 *
 */

export const isAuthenticated = () => {
  const expDate = new Date(parseInt(API.getTokenExpirationTime()))
  const accessToken = API.getAccessTokenFromUrl()

  if (!expDate || expDate <= new Date() || !accessToken) {
    // return ActionCreators.invalidateUserSesssion()
    return false
  } else {
    return true
  }
}

/**
 *
 * Logins the user
 *
 * checks if logged in and logs in or invalidates user session
 */

export const login = () => {
  if (isAuthenticated()) {
    const accessToken = API.getAccessTokenFromUrl()
    const expDate = new Date(parseInt(API.getTokenExpirationTime()))
    const refreshToken = API.getRefreshTokenFromUrl()
    return ActionCreators.validateUserSession(accessToken, expDate, refreshToken)
  } else {
    return ActionCreators.invalidateUserSession()
  }
}

// FIRST LOGIN FLOW TO GET ALL DATA

export const initialLogin = () => {
  return (dispatch) => {
    dispatch(login())

    Promise.all([
      dispatch(ProfileActions.getUserProfile()),
      dispatch(TrackActions.getTrackData())
    ])
  }
}

export const refreshAccessToken = () => {
  return (dispatch, getStore) => {
    const {refreshToken} = getStore().user

    fetch(`/refresh_token?refresh_token=${refreshToken}`)
    .then(API.parseJSON)
    .then((res) => {
      console.log(res.access_token)
      dispatch(ActionCreators.updateAccessToken(res.access_token))
    })
  }
}
