const API_URL = 'http://94.74.86.174:8080'

function doAuth(endpoint, values) {
  // Mengirim permintaan Otentikasi
  return fetch(`${API_URL}/${endpoint}`, { 
    method: 'POST', 
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' }
  })
}

function login(data) {
  return doAuth('login', data)
}

function register(data) {
  return doAuth('register', data)
}

function logout() {
  localStorage.removeItem('token')
}

function selesaiAuth(token) {
  console.log('setting token', token)
  localStorage.setItem('token', token)
}

function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('token')
}

export {login, register, selesaiAuth, getToken, logout}  
