import auth from './../../client/reducers/auth'
import * as types from './../../client/constants/ActionTypes'

describe('Auth Reducer: ', () => {
  it('should return correct initial state when no action type provided', () => {
    const initialState = auth(undefined, {})
    expect(initialState).toEqual({
      isLoggedIn: false,
      profile: null,
      accessToken: null
    })
  })

  it('RECEIVED_ACCESS_TOKEN should log in', () => {
    const accessToken = 'af13rfjdsfaf'
    const state = auth(undefined, {
      type: types.RECEIVED_ACCESS_TOKEN,
      accessToken
    })

    expect(state).toEqual({
      isLoggedIn: true,
      profile: null,
      accessToken: accessToken
    })
  })

  it('INVALIDATE_USER_SESSION should log out the user', () => {
    const loggedInState = {
      isLoggedIn: true,
      profile: {},
      accessToken: 'asdfdsfd'
    }

    const newState = auth(loggedInState, {
      type: types.INVALIDATE_USER_SESSION
    })

    expect(newState).toEqual({
      isLoggedIn: false,
      profile: null,
      accessToken: null
    })
  })

  it('RECEIVED_USER_PROFILE', () => {
    const profile = {
      name: "asdfd"
    }
    const loggedInState = {
      isLoggedIn: true,
      profile: {},
      accessToken: 'asdfdsfd'
    }

    const state = auth(loggedInState, {
      type: types.RECEIVED_USER_PROFILE,
      profile
    })

    expect(state).toEqual({
      isLoggedIn: true,
      profile: profile,
      accessToken: 'asdfdsfd'
    })
  })
})