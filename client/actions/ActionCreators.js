import * as types from '../constants/ActionTypes'

/**
 *
 * User Action Builders
 *
 */

export function validateUserSession (accessToken, expDate) {
  return {
    type: types.VALIDATE_USER_SESSION,
    accessToken,
    expDate
  }
}

export function receiveAccessToken (accessToken) {
  return {
    type: types.RECEIVED_ACCESS_TOKEN,
    accessToken
  }
}

export function invalidateUserSession () {
  return {
    type: types.INVALIDATE_USER_SESSION
  }
}

export function receiveUserProfile (profile) {
  return {
    type: types.RECEIVED_USER_PROFILE,
    profile
  }
}

/**
 *
 * Entity Action Builders
 *
 */

export function receiveApiEntities (res) {
  const { albums, artists, tracks } = res.entities

  return {
    type: types.RECEIVED_DATA_ENTITIES,
    data: {
      albums,
      artists,
      tracks,
      trackList: res.result.map((d) => { return d.track })
    }
  }
}

/**
 *
 * Filter Action Builders
 *
 */

const initialValue = {
  min: 0,
  max: 1
}

export function updateFilter (filterName, data) {
  const mergedData = Object.assign({}, initialValue, data)

  return {
    type: types.APPLY_FILTER(filterName),
    data: mergedData
  }
}

export function deactivateFilter (filterName) {
  return updateFilter(filterName, initialValue)
}

export function setFilteredTrackList (filteredTrackList) {
  return {
    type: types.UPDATE_FILTERED_TRACK_LIST,
    data: filteredTrackList
  }
}

/**
 *
 * Playlist Action Builders
 *
 */

export function createPlaylist (name) {
  return {
    type: types.PLAYLIST_CREATION_INITIATED,
    data: {
      playlistName: name,
      creatingPlaylist: true
    }
  }
}

export function playlistCreated (res) {
  const id = res.id
  const url = res.external_urls.spotify

  return {
    type: types.PLAYLIST_CREATION_COMPLETED,
    data: {
      playlistName: null,
      playlistId: id,
      playlistUrl: url
    }
  }
}

export function addingTracksToPlaylist () {
  return {
    type: types.ADDING_TRACKS_TO_PLAYLIST_INITIATED,
    data: {}
  }
}

export function tracksAddedToPlaylist () {
  return {
    type: types.ADDING_TRACKS_TO_PLAYLIST_COMPLETED,
    data: {
      creatingPlaylist: false
    }
  }
}
