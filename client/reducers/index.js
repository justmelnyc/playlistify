import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import songData from './songData'

const rootReducer = combineReducers({
  auth,
  profile,
  songData
})

export default rootReducer
