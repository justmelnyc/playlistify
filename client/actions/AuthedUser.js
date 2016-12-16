import * as ActionCreators from './ActionCreators'
import * as API from './../helpers/SpotifyApi'
import * as TrackActions from './TrackData.js'

export const initialLogin = () => {
  return (dispatch) => {
    const accessToken = API.getAccessTokenFromUrl()

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
    const accessToken = getState().user.accessToken

    fetch(API.profile, API.GETRequest(accessToken))
      .then(API.parseJSON)
      .then((profile) => {
        dispatch(ActionCreators.receiveUserProfile(profile))
        return dispatch(TrackActions.getTrackData())
      })
      .catch((e) => {
        console.error(e)
        dispatch(ActionCreators.invalidateUserSesssion())
      })
  }
}
