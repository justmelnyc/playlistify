import playlist from './../../client/reducers/playlist'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('PlaylistActions', () => {
  const initialState = {
    creatingPlaylist: false,
    playlistName: null,
    playlistId: null,
    playlistUrl: null,
    callingApi: false
  }

  it('should return initial state', () => {
    const state = playlist(undefined, {type: null})
    expect(state).toEqual(initialState)
  })

  it('initiate playlist should change createPlaylist to true', () => {
    const state = playlist(undefined, ActionCreators.initiatePlaylist())
    expect(state).toEqual(jasmine.objectContaining({
      creatingPlaylist: true
    }))
  })

  it('create playlist should accept a name and change callingApi and the name', () => {
    const name = 'The Testers Playlist'
    const state = playlist(undefined, ActionCreators.createPlaylist(name))
    expect(state).toEqual(Object.assign({}, initialState, {
      creatingPlaylist: true,
      callingApi: true,
      playlistName: name
    }))
  })

  it('playlist created should accept spotify res and update', () => {
    const url = 'spotify.com'
    const id = 'id for track'
    const res = {
      id: id,
      external_urls: {
        spotify: url
      }
    }

    const prevState = Object.assign({}, initialState, {
      creatingPlaylist: true,
      callingApi: true,
      playlistName: 'asdf'
    })

    const state = playlist(prevState, ActionCreators.playlistCreated(res))
    expect(state).toEqual(Object.assign({}, prevState, {
      callingApi: false,
      playlistUrl: url,
      playlistId: id
    }))
  })

  it('should reset back to the initial state on end', () => {
    const prevState = {
      creatingPlaylist: true,
      playlistName: 'asdfdfa',
      playlistId: 'asdfdf',
      playlistUrl: 'asdfdsfsdf',
      callingApi: true
    }
    const state = playlist(prevState, ActionCreators.endPlaylistCreation())
    expect(state).toEqual(initialState)
  })
})

