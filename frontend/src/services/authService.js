import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response
}

export const logout = () => {
  localStorage.removeItem('adminToken')
  window.location.href = '/admin/login'
}

export const getCurrentAdmin = async () => {
  const response = await api.get('/auth/me')
  return response
}