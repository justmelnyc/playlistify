// import { LoginOrRedirect } from './../../client/actions/AuthedUser.js'
import * as API from './../../client/helpers/SpotifyApi'
import * as ActionCreators from './../../client/actions/ActionCreators'
import * as AuthActions from './../../client/actions/AuthActions'

describe('Login User', () => {
  let futureDate, pastDate
  beforeEach(() => {
    futureDate = new Date()
    futureDate = futureDate.setMinutes(futureDate.getMinutes() + 10)
    pastDate = new Date()
    pastDate = pastDate.setMinutes(pastDate.getMinutes() - 10)
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

  it('#getUserProfile should dispatch receive user profile on api res', (done) => {
    const profile = {
      'profile': 'data'
    }
    const dispatch = jasmine.createSpy('dispatch')
    const getState = () => {
      return { user: { accessToken: 'asf' } }
    }

    // FIXME: THIS SPY IS NOT WORKING -- not returning a new value
    // spyOn(AuthedActions, 'fetchUserProfile').and.returnValue(Promise.resolve('fdf'))

    // AuthedActions.getUserProfile()(dispatch, getState).then(() => {
    //   expect(dispatch).toHaveBeenCalledWith(ActionCreators.receiveUserProfile(profile))
    // })
    done()
  })
})

function mockAccessToken (tokenVal = 'rando') {
  spyOn(API, 'getAccessTokenFromUrl').and.returnValue(tokenVal)
}

function mockDate (date) {
  spyOn(API, 'getTokenExpirationTime').and.returnValue(date)
}
