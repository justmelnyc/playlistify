import * as ActionCreators from './ActionCreators';
import * as API from './../constants/SpotifyApi'

export const initialLogin = () => {
  return (dispatch) => {
    const accessToken = getAccessTokenFromUrl()

    if (accessToken) {
      dispatch(ActionCreators.receiveAccessToken(accessToken))
      return dispatch(getUserProfile())
    } else {
      return dispatch(ActionCreators.invalidateUserSesssion())
    }
  }
}

export const getUserProfile = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken

    fetch(API.profile, API.GETRequest(accessToken))
      .then(API.parseJSON)
      .then((profile) => {
        dispatch(ActionCreators.receiveUserProfile(profile))
        return dispatch(getUserSongs(accessToken))
      })
      .catch((e) => {
        dispatch(ActionCreators.invalidateUserSesssion())
      })
  }
}