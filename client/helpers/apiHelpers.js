export const getRequest = (accessToken) => {
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
}

export const convertToJson = (res) => {
  return Promise.resolve(res.json())
}
