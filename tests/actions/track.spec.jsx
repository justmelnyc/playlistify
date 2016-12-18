// getTrackData
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var fetchMock = require('fetch-mock')

import * as ActionCreators from './../../client/actions/ActionCreators'
import * as TrackActions from './../../client/actions/TrackActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Track Action', () => {

})

