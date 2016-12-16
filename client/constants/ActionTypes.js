
/**
 * 
 * AUTH RELATED
 * 
 */

export const RECEIVED_ACCESS_TOKEN = 'RECEIVED_ACCESS_TOKEN'
export const INVALIDATE_USER_SESSION =
'INVALIDATE_USER_SESSION'
export const RECEIVED_USER_PROFILE =
'RECEIVED_USER_PROFILE'

/**
 * 
 * ENTITY RELATED
 * 
 */

export const RECEIVED_DATA_ENTITIES = 'RECEIVED_DATA_ENTITIES'


/**
 * 
 * FILTER RELATED
 * 
 */

export const UPDATE_FILTERED_TRACK_LIST = 'UPDATE_FILTERED_TRACK_LIST'

export const FILTER_OPTIONS = [
  'danceability',
  'energy',
  'speechiness',
  'acousticness',
  'instrumentalness',
  'liveness',
  'valence',
]

export const APPLY_FILTER = (filterName) => {
  if (FILTER_OPTIONS.indexOf(filterName) < 0) {
    console.error(`${filterName} not in FILTER_OPTIONS`)
  }

  return `APPLY_FILTER_${filterName}`
}