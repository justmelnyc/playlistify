import * as types from '../constants/ActionTypes';

/**
 * 
 * User Action Builders
 * 
 */

export function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVED_ACCESS_TOKEN,
    accessToken
  }
}

export function invalidateUserSesssion() {
  return {
    type: types.INVALIDATE_USER_SESSION
  }
}

export function receiveUserProfile(profile) {
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

export function receiveApiEntities(res) {
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

const initialActivedValue = {
  active: true,
  min: 0,
  max: 1
}

const initialDeactivedValue = {
  active: false,
  min: 0,
  max: 1
}

export function updateFilter(filterName, data) {
  const mergedData = Object.assign({}, initialActivedValue, data)

  return {
    type: types.APPLY_FILTER(filterName),
    data: mergedData
  }
}

export function activateFilter(filterName) {
  return updateFilter(filterName, initialActivedValue)
}

export function deactivateFilter(filterName) {
  return updateFilter(filterName, initialDeactivedValue)
}
