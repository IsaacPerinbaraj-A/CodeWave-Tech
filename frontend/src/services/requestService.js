import api from './api';

// Submit service request
export const createServiceRequest = async (data) => {
  try {
    const response = await api.post('/requests', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit request' };
  }
};

// Get all service requests (Admin)
export const getServiceRequests = async (params = {}) => {
  try {
    const response = await api.get('/requests', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch requests' };
  }
};

// Get single service request (Admin)
export const getServiceRequest = async (id) => {
  try {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch request' };
  }
};

// Update service request (Admin)
export const updateServiceRequest = async (id, data) => {
  try {
    const response = await api.put(`/requests/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update request' };
  }
};

// Delete service request (Admin)
export const deleteServiceRequest = async (id) => {
  try {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete request' };
  }
};

// Get statistics (Admin)
export const getStatistics = async () => {
  try {
    const response = await api.get('/requests/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch statistics' };
  }
};
