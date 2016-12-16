import * as types from '../constants/ActionTypes'

const initialState = {
  creatingPlaylist: false,
  playlistName: 'Playlistify',
  playlistId: null,
  playlistUrl: null,
  addingTracks: false
}

export default function entities (state = initialState, action) {
  switch (action.type) {

    case types.PLAYLIST_CREATION_COMPLETED:
      return Object.assign({}, state, action.data)

    case types.PLAYLIST_CREATION_INITIATED:
      return Object.assign({}, state, action.data)

    case types.ADDING_TRACKS_TO_PLAYLIST_INITIATED:
      return Object.assign({}, state, action.data)

    case types.ADDING_TRACKS_TO_PLAYLIST_COMPLETED:
      return Object.assign({}, state, action.data)

    default:
      return state
  }
}
