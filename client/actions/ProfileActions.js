import * as ActionCreators from './ActionCreators'
import * as API from './../helpers/SpotifyApi'

export const getUserProfile = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    return fetchUserProfile(accessToken).then((profile) => {
      dispatch(ActionCreators.receiveUserProfile(profile))
    })
  }
}

export const fetchUserProfile = (accessToken) => {
  return fetch(API.profile, API.GETRequest(accessToken)).then(API.parseJSON).then((d) => {
    // console.log(d)
    return d
  })
}
