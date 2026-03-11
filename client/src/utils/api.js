import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token if present
const user = localStorage.getItem('foodstore_user')
if (user) {
  const parsed = JSON.parse(user)
  api.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`
}

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('foodstore_user')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(err)
  }
)

export default api
