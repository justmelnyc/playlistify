// getTrackData
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var fetchMock = require('fetch-mock')

import * as ActionCreators from './../../client/actions/ActionCreators'
import * as TrackActions from './../../client/actions/TrackActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Track Action', () => {
  it('', (done) => {
    spyOn(TrackActions, 'paginateTrackItems').and.returnValue(Promise.resolve())

    const tracks = {
      'entities': {},
      tracks: {
        results: {}
      },
      trackList: [{track: 'asfdf', date: 'asfd'}]
    }

    fetchMock.get('*', tracks)

    const store = mockStore({
      tracks: {
        accessToken: null
      },
      user: {
        accessToken: 'asdf'
      }
    })

    const expectedActions = [
      ActionCreators.receiveApiEntities(tracks),
      ActionCreators.setFilteredTrackList(tracks.trackList)
    ]

    return store.dispatch(ProfileActions.getUserProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
  })
})

