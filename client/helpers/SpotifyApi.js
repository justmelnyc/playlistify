export const profile = 'https://api.spotify.com/v1/me'
export const trackUrl = 'https://api.spotify.com/v1/me/tracks?limit=50'

export const GETRequest = (accessToken) => {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
}

export const parseJSON = (res) => {
  return Promise.resolve(res.json())
}

export const getAccessTokenFromUrl = () => {
  const token = window.location.hash.split('&')[0].split('=')[1]
  return token || null
}