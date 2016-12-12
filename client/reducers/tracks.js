import * as types from '../constants/ActionTypes';

export default function tracks(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_SONG_DATA:
      return Object.assign({}, state, action.data)
    
    default:
      return state
  }
}
