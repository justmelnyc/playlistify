import * as types from '../constants/ActionTypes';

const initialState = {
  accessToken: null,
  error: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.REMOVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        error: action.error
      })

    case types.RECEIVE_ACCESS_TOKEN: 
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      })

    default:
      return state
  }
}