export function getAccessTokenFromUrl() {
  const token = window.location.hash.split('&')[0].split('=')[1]
  return token || null
}
