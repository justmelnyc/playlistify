import * as types from '../constants/ActionTypes'

const initialState = {
  trackList: [],
  albums: {},
  artists: {},
  tracks: {}
}

export default function entities (state = initialState, action) {
  switch (action.type) {

    case types.RECEIVED_DATA_ENTITIES:
      return Object.assign({}, state, action.data)

    default:
      return state
  }
}
