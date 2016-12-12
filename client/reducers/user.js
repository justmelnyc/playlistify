import * as types from '../constants/ActionTypes';

const initialState = {
  profile: {},
  trackList: []
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_USER_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      })

    case types.UPDATE_USER_TRACK_LIST:
      return Object.assign({}, state, {
        trackList: action.userTrackList
      })

    default:
      return state
  }
}