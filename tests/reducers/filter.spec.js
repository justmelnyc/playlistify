import filter from './../../client/reducers/filter'
import * as types from './../../client/constants/ActionTypes'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('entities: ', () => {
  const initialState = {}
  types.FILTER_OPTIONS.forEach((filter) => {
    initialState[filter] = {
      active: false,
      min: 0,
      max: 1
    }
  })

  const randomInitialState = () => {
    const state = {}
    types.FILTER_OPTIONS.forEach((key) => {
      state[key] = {
        active: Math.random() > .5 ? false: true,
        min: Math.random(),
        max: Math.random()
      }
    })

    return state
  }

  it('should return the correct intial state', () => {
    const state = filter(undefined, { type: undefined })
    expect(state).toEqual(initialState)
  })

  it('each filter should update its filter when called', () => {
    types.FILTER_OPTIONS.forEach((type) => {
      const newState = {
        min: 5,
        max: 10,
        active: true
      }

      const state = filter(randomInitialState(), ActionCreators.updateFilter(type, newState))
      expect(state[type]).toEqual(newState)
    })
  })

  it('activate a filter should set this default value', () => {
    const expectedValue = {
      active: true,
      min: 0,
      max: 1
    }

    types.FILTER_OPTIONS.forEach((type) => {
      const state = filter(randomInitialState(), ActionCreators.activateFilter(type))
      expect(state[type]).toEqual(expectedValue)
    })
  })

  it('deactivating a filter should set this default value', () => {
    const expectedValue = {
      active: false,
      min: 0,
      max: 1
    }

    types.FILTER_OPTIONS.forEach((type) => {
      const state = filter(randomInitialState(), ActionCreators.deactivateFilter(type))
      expect(state[type]).toEqual(expectedValue)
    })
  })

})
