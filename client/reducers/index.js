import { combineReducers } from 'redux'
import user from './user'
import entities from './entities'
import filter from './filter'

const rootReducer = combineReducers({
  user,
  entities,
  filter
})

export default rootReducer
