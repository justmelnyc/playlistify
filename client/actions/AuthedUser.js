export const initialLogin = () => {
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



function validateUserSession(accessToken) {
  return {
    type: '',
    accessToken: accessToken
  }
}

function invalidateUserSession() {
  return {
    type: ''
  }
}