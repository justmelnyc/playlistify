import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
var fetchMock = require('fetch-mock')

import * as API from './../../client/helpers/SpotifyApi'
import * as ActionCreators from './../../client/actions/ActionCreators'
import * as AuthActions from './../../client/actions/AuthActions'
import * as ProfileActions from './../../client/actions/ProfileActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Login User', () => {
  let futureDate, pastDate
  beforeEach(() => {
    futureDate = new Date()
    futureDate = futureDate.setMinutes(futureDate.getMinutes() + 10)
    pastDate = new Date()
    pastDate = pastDate.setMinutes(pastDate.getMinutes() - 10)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('#isAuthenticated', () => {
    it('should return true if future date', () => {
      mockAccessToken('asfds')
      mockDate(futureDate)
      expect(AuthActions.isAuthenticated()).toEqual(true)
    })

    it('should call ActionCreators#invalidateUserSession if past date', () => {
      mockAccessToken('asfds')
      mockDate(pastDate)
      expect(AuthActions.isAuthenticated()).toEqual(false)
    })
  })

  describe('#login', () => {
    let invalidateUserSession, validateUserSession
    beforeEach(() => {
      invalidateUserSession = spyOn(ActionCreators, 'invalidateUserSession')
      validateUserSession = spyOn(ActionCreators, 'validateUserSession')
    })

    it('should call #invalidateUserSession if date is in the past', () => {
      mockDate(pastDate)
      mockAccessToken()
      AuthActions.login()
      expect(invalidateUserSession.calls.count()).toEqual(1)
    })

    it('should call #validateUserSession if date is in the futre', () => {
      mockDate(futureDate)
      mockAccessToken()
      AuthActions.login()
      expect(validateUserSession.calls.count()).toEqual(1)
    })
  })
})

function mockAccessToken (tokenVal = 'rando') {
  spyOn(API, 'getAccessTokenFromUrl').and.returnValue(tokenVal)
}

function mockDate (date) {
  spyOn(API, 'getTokenExpirationTime').and.returnValue(date)
}
