import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var fetchMock = require('fetch-mock')

import * as ActionCreators from './../../client/actions/ActionCreators'
import * as ProfileActions from './../../client/actions/ProfileActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Profile Action', () => {
  it('#getUserProfile should dispatch receive user profile on api res', (done) => {
    const profile = {
      'profile': 'data'
    }

    fetchMock.get('*', profile)

    const store = mockStore({
      user: {
        accessToken: null
      },
      profile: {}
    })

    const expectedAction = ActionCreators.receiveUserProfile(profile)

    return store.dispatch(ProfileActions.getUserProfile()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
      done()
    })
  })
})
