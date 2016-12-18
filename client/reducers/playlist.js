import * as types from '../constants/ActionTypes'

const initialState = {
  creatingPlaylist: false,
  playlistName: null,
  playlistId: null,
  playlistUrl: null,
  callingApi: false
}

export default function playlist (state = initialState, action) {
  switch (action.type) {

    case types.PLAYLIST_CREATION_INITIATED:
      return Object.assign({}, state, action.data)

    case types.GENERATE_PLAYLIST:
      return Object.assign({}, state, action.data)

    case types.SET_PLAYLIST_DETAILS:
      return Object.assign({}, state, action.data)

    case types.PLAYLIST_CREATION_COMPLETED:
      return Object.assign({}, state, action.data)

    case types.FINISH_PLAYLIST_CREATION:
      return Object.assign({}, initialState)

    default:
      return state
  }
}

/**
 *
 * creatingPlaylist=true opens up a dialoge to get name
 * the submit button calls async action createPlaylist(name)
 * callingApi becomes true
 *
 * on success callingApi becomes false
 * playlistId and Url and added to be seen in the succes modal
 *
 * when exited out of the modal clear the state to default
 *
 */
