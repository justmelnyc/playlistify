import * as types from '../constants/ActionTypes';

/**
 * 
 * User Action Builders
 * 
 */

export function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVED_ACCESS_TOKEN,
    accessToken
  }
}

export function invalidateUserSesssion() {
  return {
    type: types.INVALIDATE_USER_SESSION
  }
}

export function receiveUserProfile(profile) {
  return {
    type: types.RECEIVED_USER_PROFILE,
    profile
  }
}