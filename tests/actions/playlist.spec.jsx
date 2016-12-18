// getTrackData
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var fetchMock = require('fetch-mock')

// import * as ActionCreators from './../../client/actions/ActionCreators'
import * as PlaylistActions from './../../client/actions/PlaylistActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('PlaylistActions', () => {
  it('#initiatePlaylistCreation', () => {
    // const store = mockStore({
    //   playlist: {
    //     creatingPlaylist: false,
    //     playlistName: null,
    //     playlistId: null,
    //     playlistUrl: null,
    //     callingApi: false
    //   }
    // })

    // store.dispatch(PlaylistActions.initiatePlaylist())

    // expect(store.getState()).toEqual(jasmine.objectContaining({
    //   creatingPlaylist: true
    // }))
  })
})

