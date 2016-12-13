import * as ActionCreators from './ActionCreators';
import * as API from './../helpers/SpotifyApi'
import {
  normalizeTrackArray
} from './../helpers/DataNormalizer'

export const getTrackData = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    paginateTrackItems(accessToken).then((tracks) => {
      const normalizrData = normalizeTrackArray(tracks)
        // console.log(normalizrData)
        // dispatch(ActionCreator.receiveApiEntities(normalizrData))
    })
  }
}

function paginateTrackItems(accessToken, url = API.trackUrl, items = []) {
  if (!url) {
    const normalizedData = normalizeTrackArray(items)
    console.log('asdf')
    console.log(normalizedData)

    return Promise.resolve(items)
  }

  // KEEP THIS JUST FOR DEV TO NOT BLOW UP SPOTIFY SERVERS
  if (items.length > 140) {
    // move this to !url
    const normalizedData = normalizeTrackArray(items)
    const trackIds = normalizedData.result.map((item) => {
      return item.track
    })

    return paginateTrackAudioAnalysis(accessToken, normalizedData, trackIds)
      // return Promise.resolve(items)
  }

  return fetch(url, API.GETRequest(accessToken))
    .then(API.parseJSON)
    .then((res) => {
      items = items.concat(res.items)
      return paginateTrackItems(accessToken, res.next, items)
    })
    .catch((e) => {
      dispatch(ActionCreators.invalidateUserSesssion())
    })
}

function paginateTrackAudioAnalysis(accessToken, entities, trackIds) {
  if (trackIds.length <= 0) {
    return Promise.resolve(entities)
  }

  const trackIdsToFetch = trackIds.splice(trackIds.length - 95, trackIds.length)
  const url = 'https://api.spotify.com/v1/audio-features/?ids=' + trackIdsToFetch.join(',')
  
  return fetch(url, API.GETRequest(accessToken))
    .then(API.parseJSON)
    .then((res) => {
      console.log(res)

      // WORKING
      // merge res into entities here

      return paginateTrackAudioAnalysis(accessToken, entities, trackIds)
    })
}
