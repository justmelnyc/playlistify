import * as ActionCreators from './ActionCreators'
import * as API from './../helpers/SpotifyApi'
import {
  normalizeTrackArray
} from './../helpers/DataNormalizer'

export const getTrackData = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    return paginateTrackItems(accessToken).then((tracks) => {
      const trackList = tracks.result.map((d) => { return d.track })
      tracks.trackList = trackList
      dispatch(ActionCreators.receiveApiEntities(tracks))
      dispatch(ActionCreators.setFilteredTrackList(trackList))
    })
  }
}

export function paginateTrackItems (accessToken, url = API.trackUrl, items = []) {
  if (!url) {
    const normalizedData = normalizeTrackArray(items)
    const trackIds = normalizedData.result.map((item) => {
      return item.track
    })

    return paginateTrackAudioAnalysis(accessToken, normalizedData, trackIds)
  }

  // KEEP THIS JUST FOR DEV TO NOT BLOW UP SPOTIFY SERVERS
  if (items.length > 140) {
    // NEEDS TO BE SAME AS if (!URL)
    const normalizedData = normalizeTrackArray(items)
    const trackIds = normalizedData.result.map((item) => {
      return item.track
    })

    return paginateTrackAudioAnalysis(accessToken, normalizedData, trackIds)
  }

  return fetch(url, API.GETRequest(accessToken))
    .then(API.parseJSON)
    .then((res) => {
      items = items.concat(res.items)
      return paginateTrackItems(accessToken, res.next, items)
    })
    .catch((e) => {
      console.error(e)
      // dispatch(ActionCreators.invalidateUserSesssion())
    })
}

function paginateTrackAudioAnalysis (accessToken, entities, trackIds) {
  if (trackIds.length <= 0) {
    return Promise.resolve(entities)
  }

  const trackIdsToFetch = trackIds.splice(trackIds.length - 95, trackIds.length)
  const url = 'https://api.spotify.com/v1/audio-features/?ids=' + trackIdsToFetch.join(',')

  return fetch(url, API.GETRequest(accessToken))
    .then(API.parseJSON)
    .then((res) => {
      const tracks = entities.entities.tracks
      res.audio_features.forEach((audioFeature) => {
        const id = audioFeature.id
        Object.assign(tracks[id], audioFeature)
      })
      return paginateTrackAudioAnalysis(accessToken, entities, trackIds)
    })
}
