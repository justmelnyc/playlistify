export const profile = 'https://api.spotify.com/v1/me'
export const trackUrl = 'https://api.spotify.com/v1/me/tracks?limit=50'

export const playlistCreationUrl = (userId) => {
  return `https://api.spotify.com/v1/users/${userId}/playlists`
}

export const addTracksToPlaylist = (userId, playlistId) => {
  return `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`
}

export const GETRequest = (accessToken) => {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
}

export const POSTRequest = (accessToken, body) => {
  return {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': ' application/json'
    },
    body: JSON.stringify(body)
  }
}

export const parseJSON = (res) => {
  return Promise.resolve(res.json())
}

export const getAccessTokenFromUrl = () => {
  const params = window.location.hash.split('&')
  const token = params[0] ? params[0].split('=')[1] : null
  return token
}

export const getTokenExpirationTime = () => {
  const params = window.location.hash.split('&')
  const expirationDate = params[2] ? params[2].split('=')[1] : null
  return expirationDate
}

export const getRefreshTokenFromUrl = () => {
  const params = window.location.hash.split('&')
  const refreshToken = params[1] ? params[1].split('=')[1] : null
  return refreshToken
}
