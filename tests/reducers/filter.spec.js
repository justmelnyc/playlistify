import filter from './../../client/reducers/filter'
import * as types from './../../client/constants/ActionTypes'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('entities: ', () => {
  const initialState = {
    danceability: {
      selected: false,
      value: null
    },
    energy: {
      selected: false,
      value: null
    },
    loudness: {
      selected: false,
      value: null
    },
    speechiness: {
      selected: false,
      value: null
    },
    acousticness: {
      selected: false,
      value: null
    },
    instrumentalness: {
      selected: false,
      value: null
    },
    liveness: {
      selected: false,
      value: null
    },
    valence: {
      selected: false,
      value: null
    },
    tempo: {
      selected: false,
      value: null
    },
    time_signature: {
      selected: false,
      value: null
    }
  }

  it('should return the correct intial state', () => {
    const state = filter(undefined, {type: undefined})
    expect(state).toEqual(initialState)
  })
})
