
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

/**
 * 
 * PLAYLIST RELATED
 * 
 */

export const PLAYLIST_CREATION_INITIATED = 'PLAYLIST_CREATION_INITIATED'
export const PLAYLIST_CREATION_COMPLETED = 'PLAYLIST_CREATION_COMPLETED'

export const ADDING_TRACKS_TO_PLAYLIST_INITIATED = 'ADDING_TRACKS_TO_PLAYLIST_INITIATED'
export const ADDING_TRACKS_TO_PLAYLIST_COMPLETED = 'ADDING_TRACKS_TO_PLAYLIST_COMPLETED'
