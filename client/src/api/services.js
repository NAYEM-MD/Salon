import api from './axios';

export const fetchServices = (category) =>
  api.get('/services', { params: category ? { category } : {} });

export const fetchService = (id) => api.get(`/services/${id}`);
