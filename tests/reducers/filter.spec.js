import filter from './../../client/reducers/filter'
import * as types from './../../client/constants/ActionTypes'
import * as ActionCreators from './../../client/actions/ActionCreators'

describe('filters: ', () => {
  const initialState = {
    filteredTrackList: [],
    filterOptions: {}
  }

  types.FILTER_OPTIONS.forEach((filter) => {
    initialState.filterOptions[filter] = {
      min: 0,
      max: 1
    }
  })

  const randomInitialState = () => {
    const state = {
      filteredTrackList: [],
      filterOptions: {}
    }
    types.FILTER_OPTIONS.forEach((key) => {
      state.filterOptions[key] = {
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
      }

      const state = filter(randomInitialState(), ActionCreators.updateFilter(type, newState))
      expect(state.filterOptions[type]).toEqual(newState)
    })
  })

  it('deactivating a filter should set this default value', () => {
    const expectedValue = {
      min: 0,
      max: 1
    }

    types.FILTER_OPTIONS.forEach((type) => {
      const state = filter(randomInitialState(), ActionCreators.deactivateFilter(type))
      expect(state.filterOptions[type]).toEqual(expectedValue)
    })
  })

  it('filtered track list should be there', () => {
    const filteredList = '4324 3h3243 h hsdafdafh 134hjh'.split(' ')
    filter(undefined, ActionCreators.setFilteredTrackList(filteredList))
  })

})
