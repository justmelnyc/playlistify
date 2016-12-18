import * as ActionCreators from './ActionCreators'
import * as API from './../helpers/SpotifyApi'

export const initiatePlaylist = () => {
  return ActionCreators.initiatePlaylist()
}

export const createPlaylist = (playListName) => {
  return (dispatch, getState) => {
    const { profile, accessToken } = getState().user
    const { id } = profile

    dispatch(ActionCreators.createPlaylist(playListName))

    createNewPlaylistByName(accessToken, id, playListName)
      .then((data) => {
        dispatch(ActionCreators.playlistCreated(data))
        dispatch(addAllFilteredTracksToPlaylist())
      })
      .then(() => {
        dispatch(ActionCreators.tracksAddedToPlaylist())
      })
  }
}

function createNewPlaylistByName (accessToken, userId, name) {
  const body = {
    name: name
  }

  return fetch(API.playlistCreationUrl(userId), API.POSTRequest(accessToken, body))
    .then(API.parseJSON)
}

function addAllFilteredTracksToPlaylist () {
  return (dispatch, getState) => {
    dispatch(ActionCreators.addingTracksToPlaylist())
    const { playlist, filter, user } = getState()
    const { filteredTrackList } = filter
    const { playlistId } = playlist
    const { accessToken } = user
    const userId = user.profile.id
    return addFiftyTracksToPlaylist(accessToken, userId, playlistId, filteredTrackList)
  }
}

function addFiftyTracksToPlaylist (accessToken, userId, playlistId, tracksToAdd) {
  if (tracksToAdd.length <= 0) {
    return Promise.resolve()
  }

  const url = API.addTracksToPlaylist(userId, playlistId)
  const tracks = tracksToAdd.slice(0, 40)
  const remainingTracks = tracksToAdd.slice(40)

  return fetch(url, API.POSTRequest(accessToken, convertTrackIdsToSpotifyURI(tracks)))
    .then(() => {
      return addFiftyTracksToPlaylist(accessToken, userId, playlistId, remainingTracks)
    })
}

function convertTrackIdsToSpotifyURI (trackIds) {
  return trackIds.map((id) => {
    return `spotify:track:${id}`
  })
}
