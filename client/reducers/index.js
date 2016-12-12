import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import musicData from './musicData'

const rootReducer = combineReducers({
  auth,
  profile,
  musicData
})

export default rootReducer
