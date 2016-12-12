import { combineReducers } from 'redux'
import auth from './auth'
import userData from './userData'

const rootReducer = combineReducers({
  auth,
  userData
})

export default rootReducer
