import * as types from './../constants/ActionTypes'
import * as API from './../constants/SpotifyApi'
import * as ApiHelper from './../helpers/apiHelpers'

import {
  normalizeSpotifyMusicData
} from './../helpers/normalizeData'

import {
  getAccessTokenFromUrl
} from './../helpers/util'


/**
 * 
 * Parse the Access Token and then get the users profile
 * 
 */


export const login = () => {
  return (dispatch) => {
    const accessToken = getAccessTokenFromUrl()
    if (accessToken) {
      dispatch(receiveAccessToken(accessToken))
      return dispatch(getUserProfile(accessToken))
    } else {
      return null
    }
  }
}


/**
 * 
 * Get The Users Profile and then get the Users songs
 * 
 */


function getUserProfile(accessToken) {
  return (dispatch) => {
    dispatch(requestingUserData())
    fetch(API.profileUrl, ApiHelper.getRequest(accessToken))
      .then(ApiHelper.convertToJson)
      .then((d) => {
        dispatch(receiveUserProfile(d))
        return dispatch(getUserSongs(accessToken))
      })
      .catch((e) => {
        dispatch(logOut(e))
      })
  }
}


/**
 * 
 * Get all of the users tracks through a recursive call
 * 
 */


export function getUserSongs(accessToken) {
  return (dispatch) => {
    getAllUserTracks(accessToken).then((data) => {
      console.log('DATATATATAT',data)
      const normalizeData = normalizeSpotifyMusicData(data)
      dispatch(receiveUserTracks(normalizeData))
      dispatch(updateUserTrackList(Object.keys(normalizeData.songs)))
    })
  }
}

function getAllUserTracks(accessToken, url = API.trackUrl, items = []) {
  if (!url) {
    return Promise.resolve(items)
  }

  // KEEP THIS JUST FOR DEV TO NOT BLOW UP SPOTIFY SERVERS
  if (items.length > 140) {
    return Promise.resolve(items)
  }

  return fetch(url, ApiHelper.getRequest(accessToken))
    .then(ApiHelper.convertToJson)
    .then((res) => {
      items = items.concat(res.items)
      return getAllUserTracks(accessToken, res.next, items)
    })
    .catch((e) => {
      dispatch(logOut(e))
      return
    })
}



/**
 * 
 * Action Creators 
 * 
 */

function requestingUserData() {
  return {
    type: types.REQUESTING_USER_DATA,
    requestingData: true
  }
}

function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    accessToken: accessToken
  }
}

function logOut(error = null) {
  return {
    type: types.REMOVE_ACCESS_TOKEN,
    accessToken: null,
    error: error
  }
}

function receiveUserProfile(data) {
  return {
    type: types.RECEIVE_USER_PROFILE,
    profile: data
  }
}

function updateUserTrackList(tracks) {
  return {
    type: types.UPDATE_USER_TRACK_LIST,
    userTrackList: tracks
  }
}

function receiveUserTracks(data) {
  return {
    type: types.RECEIVE_SONG_DATA,
    requestingUserProfile: false,
    data
  }
}