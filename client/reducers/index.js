import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import musicData from './musicData'

const rootReducer = combineReducers({
  auth,
  user,
  musicData
})

export default rootReducer
