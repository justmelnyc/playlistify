import entities from './../../client/reducers/entities'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('entities: ', () => {
  const initialState = {
    trackList: [],
    albums: {},
    artists: {},
    tracks: {}
  }

  it('should return correct intital state', () => {
    const state = entities(undefined, {
      type: undefined
    })
    expect(state).toEqual(initialState)
  })

  it('should update entities when provided a normalized entity structure', () => {
    const trackListArray = ['asdfd', 'asfdf']
    const trackList = ['asdfd', 'asfdf']

    const tracks = {
      'asfasdf': {
        'asf': 'asdfdfd'
      }
    }

    const artists = {
      'fdfdfdfasdf': {
        'vdvv': 'asdfdf'
      }
    }

    const albums = {
      'fffds': {
        'asdf': 'asdfdf'
      }
    }

    const entityStructure = {
      entities: {
        albums: albums,
        artists: artists,
        tracks: tracks
      },
      result: trackList
    }

    const state = entities({}, ActionCreators.receiveApiEntities(entityStructure))
    expect(state).toEqual({
      trackList: trackListArray,
      albums: albums,
      artists: artists,
      tracks: tracks
    })
  })
})
