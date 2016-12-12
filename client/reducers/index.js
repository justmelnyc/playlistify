import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import tracks from './tracks'

const rootReducer = combineReducers({
  auth,
  profile,
  tracks
})

export default rootReducer
