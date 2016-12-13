import user from './../../client/reducers/user'
import * as types from './../../client/constants/ActionTypes'
import * as ActionBuilders from './../../client/actions/actionBuilders'

describe('User: ', () => {
  it('should return correct initial state when no action type provided', () => {
    const initialState = user(undefined, {})
    expect(initialState).toEqual({
      isLoggedIn: false,
      profile: null,
      accessToken: null
    })
  })

  it('#receiveAccessToken() should log in', () => {
    const accessToken = 'af13rfjdsfaf'
    const state = user(
      undefined, ActionBuilders.receiveAccessToken(accessToken)
    )

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

    const newState = user(
      loggedInState,
      ActionBuilders.invalidateUserSesssion()
    )

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

    const state = user(
      loggedInState,
      ActionBuilders.receiveUserProfile(profile)
    )

    expect(state).toEqual({
      isLoggedIn: true,
      profile: profile,
      accessToken: 'asdfdsfd'
    })
  })
})