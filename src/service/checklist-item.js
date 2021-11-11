const API_URL = 'http://94.74.86.174:8080/item'

function getToken() {
  return localStorage.getItem('token')
}

export function fetchingItem(endpoint, options) {
  console.log(`${API_URL}/${endpoint}`)
    // api calls untuk auth header
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    headers['Authorization'] = 'Bearer ' + getToken()

    return fetch(`${API_URL}/${endpoint}`, {
      headers,
      ...options
    })
    .then(response => response.json())
  }
