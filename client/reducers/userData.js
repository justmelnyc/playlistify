import * as types from '../constants/ActionTypes';

const initialState = {
  profile: null
}

export default function userData(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_USER_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      })
    
    default:
      return state
  }
}
