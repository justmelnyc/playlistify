import * as types from '../constants/ActionTypes';

const initialState = {
  songs: {},
  artists: {},
  albums: {}
}

export default function musicData(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_SONG_DATA:
      return Object.assign({}, state, action.data)
    
    default:
      return state
  }
}
