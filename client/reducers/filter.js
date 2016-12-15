import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux'

export function generateFilterReducer(filterName) {
  const initialState = {
    active: false,
    min: 0,
    max: 1
  }

  return function filter(state = initialState, action) {
    switch (action.type) {
      case types.APPLY_FILTER(filterName):
        return Object.assign({}, state, action.data)

      default:
        return state;
    }
  }
}

const filters = {}
types.FILTER_OPTIONS.forEach((filter) => {
  filters[filter] = generateFilterReducer(filter)
})

const filter = combineReducers(filters)

export default filter
