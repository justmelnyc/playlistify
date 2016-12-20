import * as types from '../constants/ActionTypes'

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  profile: null,
  expDate: null
}

export default function auth (state = initialState, action) {
  switch (action.type) {

    case types.VALIDATE_USER_SESSION:
      return Object.assign({}, state, {
        isLoggedIn: true,
        accessToken: action.accessToken,
        expDate: action.expDate,
        refreshToken: action.refreshToken
      })

    case types.UPDATE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      })

    case types.INVALIDATE_USER_SESSION:
      return Object.assign({}, state, {
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
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
