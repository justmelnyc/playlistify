import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

export function generateFilterReducer (filterName) {
  const initialState = {
    min: 0,
    max: 1
  }

  return function filter (state = initialState, action) {
    switch (action.type) {
      case types.APPLY_FILTER(filterName):
        return Object.assign({}, state, action.data)

      default:
        return state
    }
  }
}

function filteredTrackList (state = [], action) {
  switch (action.type) {
    case types.UPDATE_FILTERED_TRACK_LIST:
      return action.data.slice()

    default:
      return state
  }
}

const filterReducers = {}

types.FILTER_OPTIONS.forEach((filter) => {
  filterReducers[filter] = generateFilterReducer(filter)
})

const filterOptions = combineReducers(filterReducers)

const filter = combineReducers({
  filteredTrackList: filteredTrackList,
  filterOptions: filterOptions
})

export default filter
