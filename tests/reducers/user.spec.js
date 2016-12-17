import user from './../../client/reducers/user'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('User: ', () => {
  it('should return correct initial state when no action type provided', () => {
    const initialState = user(undefined, {})
    expect(initialState).toEqual({
      isLoggedIn: false,
      profile: null,
      accessToken: null,
      expDate: null
    })
  })

  it('VALIDATE_USER_SESSION should log in the user', () => {
    const token = 'some random token'
    const expDate = +new Date()

    const state = user(
      undefined,
      ActionCreators.validateUserSession(token, expDate)
    )

    expect(state).toEqual(
      jasmine.objectContaining({
        isLoggedIn: true,
        accessToken: token,
        expDate: expDate
      })
    )
  })

  it('INVALIDATE_USER_SESSION should log out the user', () => {
    const loggedInState = {
      isLoggedIn: true,
      profile: {},
      accessToken: 'asdfdsfd'
    }

    const newState = user(
      loggedInState,
      ActionCreators.invalidateUserSession()
    )

    expect(newState).toEqual({
      isLoggedIn: false,
      profile: null,
      accessToken: null
    })
  })

  it('RECEIVED_USER_PROFILE', () => {
    const profile = {
      name: 'asdfd'
    }
    const loggedInState = {
      isLoggedIn: true,
      profile: {},
      accessToken: 'asdfdsfd'
    }

    const state = user(
      loggedInState,
      ActionCreators.receiveUserProfile(profile)
    )

    expect(state).toEqual({
      isLoggedIn: true,
      profile: profile,
      accessToken: 'asdfdsfd'
    })
  })
})
