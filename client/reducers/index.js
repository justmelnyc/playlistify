import { combineReducers } from 'redux'
import user from './user'
import entities from './entities'

const rootReducer = combineReducers({
  user,
  entities
})

export default rootReducer
