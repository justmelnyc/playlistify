import * as ActionCreators from './ActionCreators';
import * as API from './../helpers/SpotifyApi'
import {
  normalizeTrackArray
} from './../helpers/DataNormalizer'

export const getTrackData = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    paginateApiData(accessToken).then((tracks) => {
      const normalizrData = normalizeTrackArray(tracks)
      console.log(normalizrData)
        // dispatch(ActionCreator.receiveApiEntities(normalizrData))
    })
  }
}

function paginateApiData(accessToken, url = API.trackUrl, items = []) {
  if (!url) {
    return Promise.resolve(items)
  }

  // KEEP THIS JUST FOR DEV TO NOT BLOW UP SPOTIFY SERVERS
  if (items.length > 140) {
    return Promise.resolve(items)
  }

  return fetch(url, API.GETRequest(accessToken))
    .then(API.parseJSON)
    .then((res) => {
      items = items.concat(res.items)
      return paginateApiData(accessToken, res.next, items)
    })
    .catch((e) => {
      dispatch(ActionCreators.invalidateUserSesssion())
    })
}