import { combineReducers } from 'redux'
import user from './user'
import entities from './entities'
import filter from './filter'
import playlist from './playlist'

const rootReducer = combineReducers({
  user,
  entities,
  filter,
  playlist
})

export default rootReducer
