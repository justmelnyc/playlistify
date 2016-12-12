import * as types from '../constants/ActionTypes';

export default function profile(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_SONG_DATA:
      return Object.assign({}, state, action.songs)
    
    default:
      return state
  }
}
