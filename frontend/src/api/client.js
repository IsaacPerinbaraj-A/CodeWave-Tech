import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export const submitServiceRequest = async (data) => {
  try {
    const response = await apiClient.post('/services/request', data)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error.response?.data || { message: 'Network error occurred' }
  }
}

export default apiClient
