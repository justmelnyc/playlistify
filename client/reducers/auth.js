import * as types from '../constants/ActionTypes';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  profile: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    //remove
    case types.REMOVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        error: action.error
      })
    
    // remove
    case types.RECEIVE_ACCESS_TOKEN: 
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      })

    /**
     * 
     * REFACTORED BELOW
     * */ 

    case types.RECEIVED_ACCESS_TOKEN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        accessToken: action.accessToken
      })

    case types.INVALIDATE_USER_SESSION:
      return Object.assign({}, state, {
        isLoggedIn: false,
        accessToken: null,
        profile: null
      })

    case types.RECEIVED_USER_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      })

    default:
      return state
  }
}
