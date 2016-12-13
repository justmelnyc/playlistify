import { combineReducers } from 'redux'
import user from './user'
import musicData from './musicData'

const rootReducer = combineReducers({
  user,
  musicData
})

export default rootReducer
