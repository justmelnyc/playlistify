import entities from './../../client/reducers/entities'
import * as types from './../../client/constants/ActionTypes'
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
    const trackList = [{
      id: 'asdfasf'
    }]

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

    console.log(entityStructure)

    const state = entities({}, ActionCreators.receiveApiEntities(entityStructure))
    console.log(state)
    expect(state).toEqual({
      trackList: trackList,
      albums: albums,
      artists: artists,
      tracks: tracks
    })
  })
})